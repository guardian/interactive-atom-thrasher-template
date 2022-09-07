const {
  series, dest, src, parallel, watch,
} = require('gulp');
const del = require('del');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const requireUncached = require('require-uncached');
const s3 = require('gulp-s3-upload');
const fs = require('fs');
const template = require('gulp-template');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const file = require('gulp-file');
sass.compiler = require('node-sass');
const browserSync = require('browser-sync');

const browser = browserSync.create();
const cleanCSS = require('gulp-clean-css');
const mergeStream = require('merge-stream');
const path = require('path');
const named = require('vinyl-named');

const cdnUrl = 'https://interactive.guim.co.uk';
const webpack = require('webpack');
const ws = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const mkdirp = require('mkdirp');
// const rp = require('request-promise');
const AWS = require('aws-sdk');
const git = require('gulp-git');
const config = require('./config.json');

const isDeploy = gutil.env._.indexOf('deploylive') > -1 || gutil.env._.indexOf('deploypreview') > -1;
const live = gutil.env._.indexOf('deploylive') > -1;

const version = `v/${Date.now()}`;
const s3Path = `atoms/${config.path}`;
const assetPath = isDeploy ? `${cdnUrl}/${s3Path}/assets/${version}` : '../assets';

// hack to use .babelrc environments without env var, would be nice to
// be able to pass "client" env through to babel
const babelrc = JSON.parse(fs.readFileSync('.babelrc'));
const presets = (babelrc.presets || []).concat(babelrc.env.client.presets);
const plugins = (babelrc.plugins || []).concat(babelrc.env.client.plugins);

const webpackPlugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      babel: {
        presets,
        plugins,
      },
    },
  }),
];

const clean = () => del(['.build']);

const rendering = async (cb) => {
  try {
    const atoms = (fs.readdirSync('atoms')).filter((n) => n.slice(0, 1) !== '.');
    const renders = atoms.map((atom) => {
      const { render } = requireUncached(`./atoms/${atom}/server/render.js`);
      return Promise.resolve(render());
    });

    const htmls = await Promise.all(renders);

    htmls.forEach((html, i) => {
      const atom = atoms[i];
      mkdirp.sync(`.build/${atom}`);
      fs.writeFileSync(`.build/${atom}/main.html`, html);
    });
  } catch (err) {
    console.log(err);
  }
  cb();
};

const buildJS = () => src('atoms/**/client/js/*.js')
  .pipe(named((f) => f.relative.replace(/.js/g, '')))
  .pipe(ws({
    watch: false,
    mode: isDeploy ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.jsx?$/,
          // @guardian libs needs to be transpiled
          exclude: /node_modules\/(?!@guardian)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
              ],
            },
          },
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
        },
      ],
    },
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          sourceMap: true,
        }),
      ],
    },
    plugins: webpackPlugins,
    resolve: {
      alias: {
        shared: path.resolve(__dirname, 'shared'),
        data: path.resolve(__dirname, '../data'),
      },
    },
  }, webpack))
  .on('error', function handleError() {
    this.emit('end'); // Recover from errors
  })
  .pipe(rename((path) => {
    path.dirname = path.dirname.replace(/client/g, '');
  }))
  .pipe(replace('<%= path %>', assetPath))
  .pipe(dest('.build/'));

const buildCSS = () => src('atoms/**/client/css/*.scss')
  .pipe(replace('<%= path %>', path))
  .pipe(sass({
    includePaths: [
      path.resolve(__dirname, 'shared/css'),
    ],
  }).on('error', sass.logError))
  .pipe(rename((path) => {
    path.dirname = path.dirname.replace(/client\/css/g, '');
  }))
  .pipe(template({
    path: assetPath,
    atomPath: '<%= atomPath %>',
  }))
  .pipe(isDeploy ? cleanCSS({ compatibility: 'ie8' }) : gutil.noop())
  .pipe(dest('.build'))
  .pipe(browser.stream({
    match: '**/*.css',
  }));

const assets = () => src('assets/*')
  .pipe(dest('.build/assets/'));

const build = series(clean, parallel(buildJS, buildCSS, rendering, assets));
const templateFunc = (x) => x
  .replace(/<%= path %>/g, assetPath)
  .replace(/&lt;%= path %&gt;/g, assetPath)
  .replace(/<%= atomPath %>/g, '.');

const getAtoms = () => (fs.readdirSync('.build')).filter((n) => n !== 'assets' && n !== 'index.html');

const local = () => {
  const atoms = getAtoms();

  const atomPromises = atoms.map((atom) => {
    const js = templateFunc((fs.readFileSync(`.build/${atom}/main.js`)).toString());
    const css = templateFunc((fs.readFileSync(`.build/${atom}/main.css`)).toString());
    const html = templateFunc((fs.readFileSync(`.build/${atom}/main.html`)).toString());

    return src(['harness/*', '!harness/_index.html'])
      .pipe(template({
        js, css, html, atom, version,
      }))
      .pipe(dest(`.build/${atom}`));
  });

  atomPromises.push(src('harness/_index.html')
    .pipe(template({
      atoms,
    }))
    .pipe(rename((path) => {
      path.basename = 'index';
    }))
    .pipe(dest('.build')));

  return mergeStream(atomPromises);
};

const serve = () => {
  browser.init({
    server: {
      baseDir: '.build',
    },
    port: 8000,
  });

  watch(['atoms/**/*', 'shared/**/*', '!**/*.scss'], series(build, local));
  watch(['atoms/**/*.scss', 'shared/**/*.scss'], series(buildCSS, local));
};

const awsCredentials = new AWS.CredentialProviderChain([
  () => new AWS.EnvironmentCredentials('AWS'),
  () => new AWS.SharedIniFileCredentials({ profile: 'interactives' }),
]);

const s3Upload = (cacheControl, keyPrefix) => s3({ credentialProvider: awsCredentials })({
  Bucket: 'gdn-cdn',
  ACL: 'public-read',
  CacheControl: cacheControl,
  keyTransform: (fn) => `${keyPrefix}/${fn}`,
});

const upload = () => {
  const atoms = (fs.readdirSync('.build')).filter((n) => n !== 'assets');

  const uploadTasks = atoms.map((atom) => {
    const atomConfig = {
      title: `${config.title} – ${atom}`,
      docData: '',
      path: `${config.path}/${atom}`,
    };

    return src(`.build/${atom}/*`)
      .pipe(replace('<%= path %>', assetPath))
      .pipe(replace('&lt;%= path %&gt;', assetPath))
      .pipe(replace('<%= atomPath %>', `${cdnUrl}/${s3Path}/${atom}/${version}`))
      .pipe(s3Upload('max-age=31536000', `${s3Path}/${atom}/${version}`))
      .on('end', () => file('config.json', JSON.stringify(atomConfig))
        .pipe(file('preview', version))
        .pipe(live ? file('live', version) : gutil.noop())
        .pipe(s3Upload('max-age=30', `${s3Path}/${atom}`)));
  });

  uploadTasks.push(
    src('.build/assets/**/*')
      .pipe(s3Upload('max-age=31536000', `${s3Path}/assets/${version}`)),
  );

  return mergeStream(uploadTasks);
};

const url = (cb) => {
  const atoms = getAtoms();

  atoms.forEach((atom) => {
    gutil.log(gutil.colors.yellow(`${atom} url:`));
    gutil.log(gutil.colors.yellow(`https://content.guardianapis.com/atom/interactive/interactives/${config.path}/${atom}`));
  });

  cb();
};

// const getLogs = (atoms) => atoms.forEach((atom) => async (cb) => {
//   const liveLog = await rp(`${cdnUrl}/atoms/${config.path}/${atom}/live.log`).catch(() =>
// console.log(`LIVE REQUEST ERROR: ${atom}`));
//   const previewLog = await rp(`${cdnUrl}/atoms/${config.path}/${atom}/preview.log`).catch(() =>
// console.log(`PREVIEW REQUEST ERROR: ${atom}`));
//   console.log(`${atom} live log:`);
//   console.log(liveLog);
//   console.log(`${atom} preview log:`);
//   console.log(previewLog);
//   cb();
// });

const arg = ((argList) => {
  const args = {};
  let opt;
  let thisOpt;
  let curOpt;

  argList.forEach((argItem) => {
    thisOpt = argItem.trim();
    opt = thisOpt.replace(/^-+/, '');
    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      args[curOpt] = true;
    }
  });

  return args;
})(process.argv);

const updateDefaultAtom = (thrasherName, branchName, files) => {
  files.forEach((fileName) => {
    const folder = `${fileName.split('/').slice(0, -1).join('/')}/`;
    src([fileName])
      .pipe(replace('thrasher-name', thrasherName))
      .pipe(replace('thrasher-branch', branchName))
      .pipe(dest(folder));
  });
};

const newThrasher = (name, cb) => {
  let branchName = name;
  let thrasherName = name;
  if (name.split('/').length === 1) {
    branchName = `thrashers/${name}`;
  } else {
    // eslint-disable-next-line prefer-destructuring
    thrasherName = name.split('/')[1];
  }

  gutil.log(`Creating a new thrasher called ${gutil.colors.green(thrasherName)}`);

  gutil.log(`Branch name: ${gutil.colors.green(branchName)}`);
  git.checkout(branchName, { args: '-b' }, (err) => {
    if (err) throw err;
  });

  gutil.log(`Updating defaults for ${thrasherName}`);
  const d = new Date();
  const thrasherYear = d.getFullYear();
  const thrasherMonth = (((d.getMonth() + 1) < 10) ? '0' : '') + (d.getMonth() + 1);

  src(['config.json'])
    .pipe(replace('2020/01/...', `${thrasherYear}/${thrasherMonth}/${thrasherName}`))
    .pipe(dest('./'));

  updateDefaultAtom(thrasherName, branchName, [
    'atoms/default/client/js/app.js',
    'atoms/default/client/css/_thrasher.scss',
    'atoms/default/client/css/_basics.scss',
    'atoms/default/server/templates/main.html',
  ]);

  cb();
};

const runOnMainInstructions = () => {
  gutil.log("You're in the main branch! If you want to keep running in main, run:");
  gutil.log(gutil.colors.yellow('gulp --main'));
  gutil.log('');
  gutil.log('If you are starting a new thrasher, run:');
  gutil.log(gutil.colors.yellow('gulp --new thrasherName'));
  gutil.log('');
};

const runThrasher = series(build, local, serve);

const handleDefault = async (cb) => {
  if (arg.new) {
    newThrasher(arg.new, cb);
  } else {
    git.revParse({ args: '--abbrev-ref HEAD' }, (err, branchName) => {
      if (!arg.main && branchName === 'main') {
        runOnMainInstructions();
      } else {
        runThrasher();
      }
    });
  }
  cb();
};

const deploy = series(build, upload);

exports.new = newThrasher;
exports.build = build;
exports.deploylive = deploy;
exports.deploypreview = deploy;
// exports.log = series(getLog);
exports.url = url;
exports.default = handleDefault;

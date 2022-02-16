# interactive-atom-thrasher-template
A "thrasher" is style of "interactive content atom". They are intended for use on fronts pages and typically use a responsive design to render as a short 'banners' using the full width of the content area on desktop view, with a taller full width 'block' design on mobile / tablet.

Atoms are used to create custom frontend content which can be deployed on the frontend without it needing to be a part of the [frontend project](https://github.com/guardian/frontend). For more context on see the  [documentation about interactives in frontend](https://github.com/guardian/frontend/blob/main/docs/03-dev-howtos/05-interactives.md). Further details on how atoms function can be found in the [interactive-atom-maker project](https://github.com/guardian/interactive-atom-maker/blob/master/doc/creating-an-atom.md), which a more generalised atom builder.

This project provides: 
 - a template for building new thrashers(`./atoms/default`) and utility code (`./shared/`),
 - a dev server configuration for previewing your thrasher in a collections of sample pages 
 - scripts for compiling the thrasher code and uploading to the s3 storage bucket (in the folder defined in the ``./config.json`` file)


## Installation
requirements:
 * [Node.js](http://nodejs.org/)
 * [Homebrew](https://brew.sh/)
 * [Node Version Manager](https://github.com/nvm-sh/nvm) (recommended)
 * [gulp](https://gulpjs.com/) (optional - if you do not want to globally install gulp, prefix the gulp commands with npx  - e.g. ``npx gulp`` instead of just ``gulp``)

steps:
 - Clone this repo
 - (recommended) Switch the version of Node use for this project: ``nvm use`` (you may need to use ``nvm install`` first to install that version) 
 - Install project dependencies with ``npm install``


## Creating a New Thrasher
**Note:** Each thrasher should live within their own branch. These branches are *not* to be merged into main.
- `git checkout main` (**TO DO - change gulpfile to do this as part of the script?** )
- **TO DO - find out the purpose behind the naming logic in gulpfiles newThrasher function and document it - would you ever want to namespace your branch name with a slash?**
- Use ``gulp --new {yourThrasherName}`` to set up new branch, where `yourThrasherName` is the name for your thrasher. Note that this name will be used within HTML attributes and file paths (as well as the branch name), so should be in **kebab-case** and using only lower-case letters, numbers and dashes. This script will do the following:
  * Create a new branch called `thrashers/{yourThrasherName}`
  * Sets the s3 path in `./config.json` (but **not** the title)
  * `./atoms/default/server/templates/main.html` : changes the id of the thrasher's outer div, and the class names of the outer div and its children to use your branch name
  * `./atoms/default/client/css/_thrasher.scss` : updates the css to match the changes to main.html
  * `./atoms/default/client/css/_basics.scss` : updates the css to match the changes to main.html, also updates the class selector on the rule for the section that will contain the thrasher
  * `./atoms/default/client/js/app.js` : inserts the branch name into the component string passed to the trackLoad function
- After ``gulp --new {yourThrasherName}`` is finished, edit `./config.json` to set the title. In production, this title will be used as the id for the section element your thasher will be nested in. (Note that this id does not get updated in the sample pages used on the dev server - the section will have the fixed id of "thrasher-atom")

**TO DO - clarify how central production can change the container name, and the impact on using it in code - ie you need to make sure they use the same container name as you**


## Development
**To update the code of your thrasher use:**
 * The ``./config.json`` file to set the title, data sources and folder location (just add your thrasher's name)
 * Add html to: ``./atoms/default/server/templates/main.html``
 * Add css to: ``./atoms/default/client/css/main.scss``
 * Add js to: ``./atoms/default/client/js/app.js``

**To preview your thrasher, run the default gulp command:**
```
gulp
```
You should now be running the thrasher locally at: [http://localhost:8000/](http://localhost:8000/)

To preview your thrasher use **Immersive Interactive** for DotCom or **Android Front Webview** for Apps.



### Using Static Assets
- Assets can be bundles in the thrasher build into s3 (don’t use uploader tool), SUBFOLDERS IN ASSETS FOLDER ARE NOT SUPPORTED 
- **Should use <%= path %> in the src html file for img src**. The wildcard is replaced with relative url to the asset in dev (``gulp``)and absolute in build (``gulp deploylive``) Must be need absolute url in prod for so apps can find the file. [the absolute urls would only work in dev after the assets are pushed to s3 using ``gulp deploylive``]  

### Image compression

Some things to remember:
1. Avoid GIF. Ideally, provide video, maybe with a GIF fallback. All GIFs for a front shouldn’t go over 120KB. FOr article, maybe 250KB. https://ezgif.com/ is your friend (resize, delete frames, colour reduction, lossy)
2. Always resize assets to how big they appear, makes no sense to provide them bigger (yeah, retina, but only if weight can be controlled) and no sense to not crop stuff that’s never shown!
3. Handbrake for videos: ideally multiple formats with a mp4 fallback for Safari. Resized to size, remove uneeded tracks incl. audio!, 2-pass, set bitrate as low as possible
4. Use squoosh.app/ for images. If no transparency: JPEG. If PNG: always PNG8!


### Apps compatibility
To ensure maximum compatibility with apps, ensure the following:
 - Test with the "Android front webview" after starting the `gulp` build. This allows you to preview how the thrasher looks like in the app (without the styles inherited from dotcom).
 - All assets have a fully qualified URL. For instance `assets/myimage.png` might work on dotcom but it won't work on apps. However `https://interactive.guim.co.uk/atoms/thrashers/2020/10/first-thing-election-special/assets/v/1602172252139/demo.png` will do just fine. 

## Compiling and Deploying

_Before deploying you'll need to pull credentials from Janus for the `interactives` account_

To push your thrasher to preview (pushes to a bucket in CAPI preview) run:

```
gulp deploypreview
```


To push your thrasher to live (pushes to a bucket in CAPI live) run:

```
gulp deploylive
```

To get the capi URL of your thrasher run:

```
gulp url
```

### Post Deploying / Using your Thrasher
Note that for the a Thrasher (or any atom) to be previewed or used on the live site, it needs to be deployed to in the fronts tool **(TO DO - check if there are any other tools used to deploy atoms?)**. Uploading to s3 does not automatically deploy the new thrasher to fronts - this needs to be done separately.

- You will need access to fronts tool to deploy the thrasher to fronts and see it work
- **To Do - outline how to deploy to fronts using the capi url, link to documentation for fronts if available**
- **To Do - outline the typical test/approval/deploy process - preferably pointing to an external document as that isn't really a technical matter belongin in the README**


### Updating a Deployed Thrasher
An existing thrasher needs to be updated, running ``gulp deploylive`` again after making your updates will upload the new version to s3 and replace the old version. **(TO DO - is it recommended to change the year and month in the config.path so save a new version and keep the old one?)**

Note that as fronts are “pressed”, uploading a change to the atom does not automatically cause the fronts that using that atom to update themselves.

Going to the fronts tool and either removing and re-inserting the atom or moving the atom to a new location will prompt the front to re-load the atom from (so it will then have the new version). 


## Maintenance

To update the content on the UK front, follow these steps

1. Visit the front you want, for example the [UK front](https://www.theguardian.com/uk)
2. In Chrome dev tools, go to Sources -> Page, and find the base source for the page you want — in this case open www.theguardian.com, and select 'uk'
3. Select all the HTML code, and copy it into the front's harness [harness/front-uk.html](harness/front-uk.html)
4. Add the following `<section>` element where you want the thrasher to appear (usually in between two other `<section>` elements):
  ```html
<section id="thrasher-atom" class="fc-container fc-container--thrasher fc-container--will-have-toggle flashing-image js-container--toggle " data-component="thrasher-atom" aria-expanded="true"><div class="fc-container__inner"><header class="fc-container__header js-container__header"><div class="fc-container__header__title"><h2 tabindex="0">thrasher-atom</h2></div></header><div class="fc-container--rolled-up-hide fc-container__body" data-title="thrasher-atom"><div class="fc-slice-wrapper"><ul class="u-unstyled l-row  l-row--cols-1 fc-slice fc-slice--mf"><li class="fc-slice__item l-row__item l-row__item--span-1 u-faux-block-link"><div class="facia-snap facia-snap--default facia-snap-embed fc-item fc-item--force-image-upgrade fc-item--has-no-image fc-item--pillar-news fc-item--type-article js-fc-item js-snap fc-item--list-media-mobile fc-item--full-media-50-tablet " data-link-name="external | group-1 | card-@1" data-item-visibility="all" data-test-id="facia-card" data-id="snap/1574843074989" data-snap-type="interactive" data-snap-uri="https://content.guardianapis.com/atom/interactive/interactives/2019/11/test-snap/snap">
  <!-- SNAP GOES HERE -->
  <link rel="stylesheet" type="text/css" href="main.css" />
    <%= html %>
    <script><%= js %></script>
</div></li></ul></div></div></div></section>
  ```

These steps apply for updating any of the other fronts, or even adding a new one, in which case a link to the new front needs to be added in [harness/index.html](harness/index.html).










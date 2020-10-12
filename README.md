# interactive-atom-thrasher-template

**You will need<br>**
 * [Node.js](http://nodejs.org/)<br>
 * [Homebrew](https://brew.sh/)

## Installation
Clone this repo

**Note:** New thrashers should live within their own branch

 Install project dependencies with

```
npm install
```


## Usage

### Creating your Thrasher

```
gulp
```
Run gulp, you should now be running the thrasher locally at: //localhost:8000
<br>To preview your thrasher use **Immersive Interactive** for DotCom or **Android Front Webview** for Apps.

**To update the code of your thrasher use:**

 * The **congif.json** file to set the title, data sources and folder location (just add your thrashers name)<br>
 * Add html to: **atoms/server/templates/main.html**<br>
 * Add css to: **atoms/client/css/main.scss**<br>
 * Add js to: **atoms/client/js/app.js**

<br>

## Image compression

Some things to remember:
1. Avoid GIF. Ideally, provide video, maybe with a GIF fallback. All GIFs for a front shouldn’t go over 120KB. FOr article, maybe 250KB. https://ezgif.com/ is your friend (resize, delete frames, colour reduction, lossy)
2. Always resize assets to how big they appear, makes no sense to provide them bigger (yeah, retina, but only if weight can be controlled) and no sense to not crop stuff that’s never shown!
3. Handbrake for videos: ideally multiple formats with a mp4 fallback for Safari. Resized to size, remove uneeded tracks incl. audio!, 2-pass, set bitrate as low as possible
4. Use squoosh.app/ for images. If no transparency: JPEG. If PNG: always PNG8!

<br>

## Apps compatibility
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

To get the URL of your thrasher run:

```
gulp url
```


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











# interactive-atom-thrasher-template

**You will need<br>**
 * [Node.js](http://nodejs.org/)<br>
 * [Homebrew](https://brew.sh/)

## Installation
 Install project dependencies with<br>
```
npm install
```

and this script (which may take some time to run depending on how long it takes Homebrew to update)<br>
 ```
 ./setup-certs.sh
 ```
 
 <br>

## Usage

### Creating your Thrasher

Run `gulp`, you should now be running the thrasher locally at: //localhost:8000 
<br>To preview your thrasher use **Immersive Interactive** for DotCom or **Android Front Webview** for Apps.

**To update the code of your thrasher use:**

 * The **congif.json** file to set the title, data sources and folder location (just add your thrashers name)<br>
 * Add html to: **atoms/server/templates/main.html**<br>
 * Add css to: **atoms/client/css/main.scss**<br>
 * Add js to: **atoms/client/js/app.js**

<br>

## Compiling and Deploying

To push your thrasher to preview run:<br>
```
gulp deploypreview
```

To push your thrasher to live run:<br>
```
gulp deploylive
```

To get the URL of your thrasher run:<br>
```
gulp url
```














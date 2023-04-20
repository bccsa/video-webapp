# video-webapp
Video web-app for live and VOD content


## Development
### Init submodules
```shell
git submodule update --init --recursive
```

### Install npm packages
```shell
npm install
cd client
npm install
cd ../client-tailwind
npm install
cd ../cms
npm install
cd ../server
npm install

### Configure database
To do

### Tailwind
Start the tailwind build script to monitor for code changes and automatically build client/tailwind.css:
```shell
# Mac & linux
cd client-tailwind
./build.sh
```
or
```batch
rem Windows
cd client-tailwind
build.cmd
```

### Start directus
```shell
cd cms
npx directus start
```

### Start server
```shell
cd server
node index.js
```

### Client notes
#### env.json


### Capacitor notes
Disable build error for custom (vanilla JS) project: Added the following to the ionic capacitor project's package.json (root folder):
```json
"scripts": {
    "ionic:build": "echo no script needed"
}
```

To test and build on iOS and Android, Xcode and Android Studio needs to be installed.
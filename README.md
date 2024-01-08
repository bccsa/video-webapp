# video-webapp
Video web-app for live and VOD content

## Repository structure
- `android` - Folder used by [Capacitor](https://capacitorjs.com/) to build an Android app
- `client-tailwind` - Configuration and base CSS file for Tailwind, used by the client
- `client` - The frontend, using [modular-ui](https://github.com/bccsa/modular-ui)
- `cms` - A [Directus](https://directus.io) backend for managing the content of the webapp
- `docker-files` - Several Docker files to deploy the backend
- `docs` - Documentation related to features in the app
- `ios` - Folder used by [Capacitor](https://capacitorjs.com/) to build an iOS app
- `server` - The server that runs the client

## Developing locally
Read the [setup guide](./docs/setup.md).

---

## Auth0 configuration
If you need to work on Auth0 related features and don't want to or can't use an existing instance, create a new application in Auth0's control panel with the following settings (only non-default settings listed):
* Application type: Single Page Application
* Allowed Callback URLs: http://localhost:8080
* Allowed Logout URLs: http://localhost:8080
* Allowed Web Origins: http://localhost:8080
* Refresh Token Rotation: Rotation selected

Create an API for your application in the Auth0 control panel. The API identifier should be set as the AUTH0_AUDIENCE environmental variable.

---

## Capacitor notes
Disable build error for custom (vanilla JS) project: Added the following to the ionic capacitor project's package.json (root folder):
```json
"scripts": {
    "ionic:build": "echo no script needed"
}
```

To test and build on iOS and Android, Xcode and Android Studio needs to be installed.

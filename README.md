# video-webapp
Video web-app for live and VOD content

---

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
cd scripts
npm install
cd ../../server
npm install

### Configure database
To do

### Tailwind
Start the tailwind build script to monitor for code changes and automatically build client/tailwind.css:

Mac & Linux:
```shell
cd client-tailwind
./build.sh
```
or

Windows:
```powershell
cd client-tailwind
./build.cmd
```

---

### Start directus
```shell
cd cms
npx directus start
```

---

### Start server
Create a .env environmental variables file in the project root:
```shell
# Postgres database connection
# ----------------------------
DB_USER="postgres"
DB_PASSWORD="postgrespw"
DB_HOST="localhost"
DB_DATABASE="cms"
DB_PORT="5432"

# Server (api) settings
# ---------------------
PORT="8080"

# App settings
# ------------
APP_TITLE="Video WebApp"
SOCKET_URL="http://localhost:8080"

# Auth0 settings
# --------------
AUTH0_DOMAIN="your.auth0.domain"
AUTH0_CLIENT_ID="your_auth0_client_id"
AUTH0_AUDIENCE="https://your.api.identifier"
AUTH0_ALGORITHM="RS256"
# Auth0 application secret or public certificate (insert cert for RS256 algorithm)
AUTH0_SECRET="Auth0 secret or cert"
```

Start the server in debug mode from the Visual Studio Code debug menu.

--- 

### Create/update DB [snapshot](cms/snapshot/CMS-DB.yaml) to be used to update (alpha/beta/prod) DB 
```bash cms/scripts/pg-dbtoyaml <HOST> <PORT> <USER> <DB> <OUTPUTFILE>```

See docs [here](cms/scripts/README.md) for spesifics on env variables

---

### Client notes

### Auth0 configuration
Create a new application in Auth0's control panel with the following settings (only non-default settings listed):
* Application type: Single Page Application
* Allowed Callback URLs: http://localhost:8080,https://your.app.url
* Allowed Logout URLs: http://localhost:8080,https://your.app.url
* Allowed Web Origins: http://localhost:8080,https://your.app.url
* Refresh Token Rotation: Rotation selected

Create an API for your application in the Auth0 control panel. The API identifier should be set as the AUTH0_AUDIENCE environmental variable.

---

### Capacitor notes
Disable build error for custom (vanilla JS) project: Added the following to the ionic capacitor project's package.json (root folder):
```json
"scripts": {
    "ionic:build": "echo no script needed"
}
```

To test and build on iOS and Android, Xcode and Android Studio needs to be installed.
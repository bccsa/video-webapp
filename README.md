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
### Install Directus
```shell
cd cms
npx directus init
```

Edit the newly created .env file and enter the correct PostgreSQL database details

Note: The correct way here is probably:
1. Create an .env file with the required database details
2. Run ```npx directus bootstrap```, (usint --skipAdminInit in CI/CD use cases)
See https://docs.directus.io/self-hosted/cli.html for Directus docs
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
CACHE_MAXAGE=0
PRIVACY_POLICY="Privacy policy text.
Markdown format is supported."
ANALYTICS_URL="Url to analytics server"

# Auth0 settings
# --------------
AUTH0_DOMAIN="your.auth0.domain"
AUTH0_CLIENT_ID="your_auth0_client_id"
AUTH0_AUDIENCE="https://your.api.identifier"
AUTH0_ALGORITHM="RS256"
# Auth0 application secret or public certificate (insert cert for RS256 algorithm)
AUTH0_SECRET="Auth0 secret or cert"
# Bypass Auth0 authentication for testing purposes
AUTH0_BYPASS=false
```

Start the server in debug mode from the Visual Studio Code debug menu.

--- 

### Create/update a DB [snapshot](cms/snapshot/CMS-DB.yaml) to be used to update (alpha/beta/prod) DB (snapshot used for CI/CD)
Environment variables need to be added to the [.env](./.env) file in the root of the project (See docs [here](cms/scripts/README.md))
Environment variables needed for the scripts to run: 
* DB_USER="postgres"
* DB_PASSWORD="postgrespw"
* DB_HOST="localhost"
* DB_DATABASE="cms"
* DB_PORT="5432"

**!!! See [this README](cms/scripts/README.md) for prerequisites that is needed to run these scripts**<br>
**!!! Important to update your dev DB with the [production latest snapshot](cms/snapshot/CMS-DB.yaml) before you make changes, otherwise you will backdate the Production DB**

#### This script is used to update the DB snapshot from your local dev db to update the production db
```bash
cd cms/scripts; bash pg-dbtoyaml.sh
```
#### To update your local dev DB with the latest snapshot you can run: 
```bash
cd cms/scripts; bash pg-update.sh
```

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
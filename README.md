# video-webapp
Video web-app for live and VOD content

---

## Development environment

### Prerequisites
* NodeJS V18 or newer
* NPM V8 or newer
* Postgresql V12
* Python V3 (used to create database update scripts)
* expect (Debian/Ubuntu: apt-get update && apt-get install -y expect; MacOS: sudo port install expect;)

Pyrseas needs to be installed for database setup and migration:

(See https://pyrseas.readthedocs.io/en/latest/install.html)

```shell
pip3 install Pyrseas
pip3 install psycopg2
pip3 install psycopg_c
pip3 install psycopg_binary
pip3 install libpq
```

### Clone and Init submodules
After cloning the project to your development computer, initialize the git sub-modules:
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
```

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

### Install Directus in your development environment
https://docs.Directus.io/self-hosted/cli.html#bootstrap-a-project

**1. Create an .env file in the ```cms``` directory with the required database details**
*Note that this is a different file than the ```.env``` file created in the project root directory. You should however use the same database connection details in this file.*

```shell
DB_CLIENT="postgres"
DB_USER="postgres"
DB_PASSWORD="postgrespw"
DB_HOST="localhost"
DB_DATABASE="YourDBname"
DB_PORT="5432"
KEY="YourKey"
SECRET="YourSecret"
ADMIN_EMAIL="your@email.choice"
ADMIN_PASSWORD="YourPassword!"
```

The ```KEY``` and ```SECRET``` can be generated with the following OpenSSL command:
```shell
openssl rand -base64 24
```

**2. Bootstrap the Directus database**
Navigate to the ```cms``` directory and run
```shell
npx Directus bootstrap
```

**3. Update the database schema**
Ensure you are in the ```cms``` directory, and run
```shell
npx directus schema apply --yes ./snapshot/directus-db.yaml
cd scripts
bash pg-update.sh
```

*Important! The ```pg-update.sh``` script reads database connection details from the ```.env``` file in the project root directory. You should therefore create the root ```.env``` file before running the ```pg-update.sh``` script (see [Start server](https://github.com/bccsa/video-webapp#start-server)).*

**4. Start Directus
Ensure you are in the ```cms``` directory, and run
```shell
npx Directus start
```

The default url is http://localhost:8055

**5. Create sections and add data**
The video-webapp needs two default sections to be added (case sensitive):
* Live
* VOD

These should be manually added in the Directus web-app. Also add some collections and episodes in order to show content in your video-webapp.

---

### Start server
Create a .env environmental variables file in the project root:
```shell
# Postgres database connection
# ----------------------------
DB_USER="postgres"
DB_PASSWORD="postgrespw"
DB_HOST="localhost"
DB_DATABASE="YourDBname"
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

## Making changes to the database structure/schema
Whether making changes through Directus or directly to the database (e.g. stored functions, indexing, etc.), you should first ensure your database schema is at the latest revision.

We are using the built-in Directus schema migration tool to migrate Directus-controlled database configuration. But as this tool does not include custom database configuration (stored functions, indexes, etc.) we are using Pyrseas (through the ```pg-update.sh``` script) to migrate the custom changes as well.

Ensure you are in the ```cms``` directory, and run:
```shell
npx directus schema apply --yes ./snapshot/directus-db.yaml
cd scripts
bash pg-update.sh
```

When you are ready to commit your database changes, you need to create snapshots of the database schema and Directus configuration.

Ensure that you are in the ```cms``` directory, and run:
```shell
npx directus schema snapshot --yes ./snapshot/directus-db.yaml
cd scripts
bash pg-yamltodb.sh
```

---

### Auth0 configuration
Auth0 can be bypassed in your development environment by setting the ```AUTH0_BYPASS``` parameter in the ```.env``` file in the project route to ```true```.

If you need to work on Auth0 related features, create a new application in Auth0's control panel with the following settings (only non-default settings listed):
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

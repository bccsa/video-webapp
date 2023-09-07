# video-webapp
Video web-app for live and VOD content

## Repository structure
- `android` - Folder used by [Capacitor](https://capacitorjs.com/) to build an Android app
- `client-tailwind` - Configuration and base CSS file for Tailwind, used by the client
- `client` - The frontend, using [modular-ui](https://github.com/bccsa/modular-ui)
- `cms` - A [Directus](https://directus.io) backend for managing the content of the webapp
- `docker-files` - Several Docker files to deploy the backend
- `ios` - Folder used by [Capacitor](https://capacitorjs.com/) to build an iOS app
- `server` - The server that runs the client

## Developing locally
### Clone and init submodules
After cloning the project to your machine, initialize the git submodules to fetch modular-ui:
```shell
git submodule update --init --recursive
```

### Prerequisites
* [NodeJS](https://nodejs.org/en) v18 or newer
* NPM v8 or newer (comes with NodeJS)
* [PostgreSQL](https://www.postgresql.org/) **v12**

  - To install on a Mac with [Homebrew](https://brew.sh/):
    - `brew install postgresql@12`
    - `brew link postgresql@12` (this will make the Postgres CLI tools available)
    - `brew services start postgresql@12`
    - By default, a `template1` database is created, with an empty username and password. Connect to the database with the CLI or a tool such as [TablePlus](https://tableplus.com/), then create a user and database for the app:
      - `CREATE DATABASE videoapp`
      - `CREATE USER videoapp WITH PASSWORD 'password';`
      - `GRANT ALL PRIVILEGES ON DATABASE videoapp TO videoapp;`

* Python v3 (used to create database update scripts)
* expect (Debian/Ubuntu: `apt-get update && apt-get install -y expect` MacOS: `sudo port install expect` with MacPorts or `brew install expect` with Homebrew)

### 1. Install npm packages
```shell
npm ci

cd client
npm ci
```

### 2. Main environment
Create a `.env` file in the root of the project. Start by copying the example file, then adjust variables as needed, in particular the database credentials:
```shell
cp .env.example .env
```


### 3. Tailwind
Install dependencies:
```sh
cd client-tailwind
npm ci
```

Start the tailwind build script to monitor for code changes and automatically build client/tailwind.css:

```sh
npm run watch
```

### 4. Directus
#### 4.1. Create an .env file in the `cms` directory
*Note that this is a different file than the ```.env``` file created in the project root directory. You should however use the same database connection details in this file.*

Start by copying the example file, then adjust variables as needed, in particular the database credentials:
```shell
cd cms
cp .env.example .env
```

*Important: The database password should not contain the `"`, `{` or `}` characters, as this breaks Postgress database schema migration in [pg-yamltodb.sh](./cms/scripts/pg-yamltodb.sh).*

The ```KEY``` and ```SECRET``` can be generated with the following OpenSSL command:
```shell
openssl rand -base64 24
```

#### 4.2. Install dependencies
From the `cms` folder:

```sh
npm ci
```

[Pyrseas](https://pyrseas.readthedocs.io/en/latest/install.html) needs to be installed for database setup and migration:

```shell
pip3 install Pyrseas psycopg2 psycopg_c psycopg_binary
```

#### 4.3. Bootstrap the Directus database
Navigate to the `cms` directory and run
```shell
npx directus bootstrap
```

#### 4.4. Update the database schema
Ensure you are in the `cms` directory, and run
```shell
npm schema:update
```

#### 4.5. Start Directus
Ensure you are in the `cms` directory, and run
```shell
npm start
```

The default url is http://localhost:8055

#### 4.6. Create sections and add data
The video-webapp needs two default sections to be added (case sensitive):
* Live
* VOD

These should be manually added in the Directus interface. Also add some collections and episodes in order to show content in your video-webapp.

### 5. Server
Install dependencies:
```sh
cd server
npm ci
```

Start the server in debug mode from the Visual Studio Code debug menu (or by pressing `F5`), or run manually from the `server` folder:
```sh
npm start
```

--- 

## Making changes to the database structure/schema
Whether making changes through Directus or directly to the database (e.g. stored functions, indexing, etc.), you should first ensure your database schema is at the latest revision.

We are using the built-in Directus schema migration tool to migrate Directus-controlled database configuration. But as this tool does not include custom database configuration (stored functions, indexes, etc.) we are using Pyrseas (through the `pg-update.sh` script) to migrate the custom changes as well.

Ensure you are in the `cms` directory, and run:
```shell
npm run schema:update
```

---

## Auth0 configuration
Auth0 can be bypassed in your development environment by setting the `AUTH0_BYPASS` parameter in the `.env` file in the project route to `true`.

If you need to work on Auth0 related features, create a new application in Auth0's control panel with the following settings (only non-default settings listed):
* Application type: Single Page Application
* Allowed Callback URLs: http://localhost:8080,https://your.app.url
* Allowed Logout URLs: http://localhost:8080,https://your.app.url
* Allowed Web Origins: http://localhost:8080,https://your.app.url
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

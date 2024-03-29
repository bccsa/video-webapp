# Local setup guide
These steps will guide you through getting the frontend, server and CMS to run locally.

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
```

### 2. Main environment
Create a `.env` file in the root of the project. Start by copying the example file, then adjust variables as needed, in particular the database and Auth0 credentials:
```shell
cp .env.example .env
```
Ask a team member for existing Auth0 credentials or create your own Auth0 instance, [see below](#auth0-configuration).

### 3. Client
Install dependencies:
```sh
cd client
npm ci
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
npm run schema:update
```

The default url is http://localhost:8055

#### 4.5. Create sections and add data
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

### 6. Start everything
To start both the CMS and server locally, and watch Tailwind files for changes in the frontend, run the following command from the main directory:

```sh
npm start
```

In Visual Studio Code, you can also use the debug menu to start everything, or press `F5`.

--- 

## Making changes to the database structure/schema
Whether making changes through Directus or directly to the database (e.g. stored functions, indexing, etc.), you should first ensure your database schema is at the latest revision.

We are using the built-in Directus schema migration tool to migrate Directus-controlled database configuration. But as this tool does not include custom database configuration (stored functions, indexes, etc.) we are using Pyrseas (through the `pg-update.sh` script) to migrate the custom changes as well.

Ensure you are in the `cms` directory, and run:
```shell
npm run schema:update
```

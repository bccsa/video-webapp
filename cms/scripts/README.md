# Video-webapp CMS Scripts

prerequisite:
1. python (https://www.python.org/downloads/) (might already be included if you have XCode installed)
2. Install PostgreSQL (brew install postgresql@14)
2. expect (Debian: apt-get update && apt-get install -y expect; Mac: sudo port install expect;)
3. pip3 install Pyrseas (see https://pyrseas.readthedocs.io/en/latest/install.html)
4. pip3 install psycopg2
5. pip3 install psycopg_c
6. pip3 install psycopg_binary
7. pip3 install libpq


## [Link to Pyrseas docs](https://pyrseas.readthedocs.io/_/downloads/en/latest/pdf/)
* The following scripts is used for:
1. Create a yaml snapshot of a db and store it [here](../snapshot/CMS-DB.yaml)
2. Create a diff between the [snapshot](../snapshot/CMS-DB.yaml) and a destination DB using the snapshot from 1. and saving it [here](../snapshot/CMS-DIFF.sql)
3. Create & update a destination DB (this step runs step 2. and 3. in one script)

## 1. [pg-dbtoyaml.sh](./pg-dbtoyaml.sh)

Bash script used to create a snapshot from your DEV DB (snapshot will be used to update the production DB)

run: 
```bash pg-dbtoyaml.sh```

Script will promt use to enter a password for the DB_USER supplied

env variables: (Variables should be saved in a .env file in the root of the project [here](../../.env))
1. DB_HOST: DB server hostname/ip 
2. DB_PORT: DB server port
3. DB_USER: User with access to DB
4. DB_PASSWORD: User password
5. DB_DATABASE: Database name to export to yaml

Links to docks: 
1. https://pyrseas.readthedocs.io/en/latest/dbtoyaml.html?highlight=dbtoyaml

---

## 2. [pg-yamltodb.sh](./pg-yamltodb.sh)

Bash script used to create a diff between snapshot created in section 1 and destination DB

run: 
```bash pg-yamltodb.sh```

env variables: (Variables should be saved in a .env file in the root of the project [here](../../.env))
1. DB_HOST: DB server hostname/ip 
2. DB_PORT: DB server port
3. DB_USER: User with access to DB
4. DB_PASSWORD: User password
5. DB_DATABASE: Database name to export to yaml

---

## 3. [pg-update.sh](./pg-update.sh)

Bash script to create diff by calling section 2 and applying the diff created to the destination DB (used by docker)

run: 
```bash pg-update.sh```

env variables (Uses docker env variables or store in the .env file in the root of the project [here](../../.env)): 
1. DB_HOST: DB server hostname/ip 
2. DB_PORT: DB server port
3. DB_USER: User with access to DB
4. DB_PASWORD: User password
5. DB_DATABASE: Database name to export to yaml

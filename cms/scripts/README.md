# Video-webapp CMS Scripts

## [Link to Pyrseas docs](https://pyrseas.readthedocs.io/_/downloads/en/latest/pdf/)
* The following scripts is used for:
1. Create a yaml snapshot of a db and store it [here](../snapshot/CMS-DB.yaml)
2. Create a diff between the [snapshot](../snapshot/CMS-DB.yaml) and a destenation DB using the snapshot form 1. and saving it [here](../snapshot/CMS-DIFF.sql)
3. Create & update a destenation DB (this step runs step 2. and 3. in one script)

## 1. [pg-dbtoyaml.sh](./pg-dbtoyaml.sh)

Bash script used to create a snapshot from your DEV DB (snpashot will be used to update the production DB)

prerequisite:
1. python (https://www.python.org/downloads/) (apt update; apt install python3)
2. expect (Debian: apt-get update && apt-get install -y expect; Mac: sudo port install expect;)
3. pyrseas (https://pyrseas.readthedocs.io/en/latest/install.html) (pip install Pyrseas)
4. pip install psycopg2
5. pip3 install psycopg_c
6. pip3 install psycopg_binary
7. pip3 install libpq

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

Bash script used to create a diff between snapshot created in section 1 and destenation DB

prerequisite:
1. python (https://www.python.org/downloads/)
2. expect (Debian: apt-get update && apt-get install -y expect; Mac: sudo port install expect;)
3. pyrseas (https://pyrseas.readthedocs.io/en/latest/install.html)
4. pip install psycopg2
5. pip3 install psycopg_c
6. pip3 install psycopg_binary
7. pip3 install libpq

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

Bash script to create diff by calling section 2 and applying the diff created to the destenation DB (used by docker)

prerequisite:
1. python (https://www.python.org/downloads/)
2. expect (Debian: apt-get update && apt-get install -y expect; Mac: sudo port install expect;)
3. psql (apt-get update && apt-get install -y postgresql-client)
4. pyrseas (https://pyrseas.readthedocs.io/en/latest/install.html)
5. pip install psycopg2
6. pip3 install psycopg_c
7. pip3 install psycopg_binary
8. pip3 install libpq

run: 
```bash pg-update.sh```

env variables (Uses docker env variables or store in the .env file in the root of the project [here](../../.env)): 
1. DB_HOST: DB server hostname/ip 
2. DB_PORT: DB server port
3. DB_USER: User with access to DB
4. DB_PASWORD: User password
5. DB_DATABASE: Database name to export to yaml

---

## 4. [pg-diff.py](./pg-diff.py) (Old/Deprecated)

Python script to create a diff between 2 yaml snapshots of databases

prerequisite:
1. python (https://www.python.org/downloads/)
2. pip install jsondiff
3. pip install pyyaml

run: 
```python cms/scripts/pg-diff.py <SRCFILE> <DSTFILE> <OUTPUTFILE>```

env variables: 
1. SRCFILE: Source yaml file (file created from source db)
2. DSTFILE: Destination yaml file (file file destination from source db from source db)
3. OUTPUTFILE: Where the diff should be output
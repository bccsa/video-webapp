## [Link to Pyrseas docs](https://pyrseas.readthedocs.io/_/downloads/en/latest/pdf/)

## 1. [pg-dbtoyaml.sh](./pg-dbtoyaml.sh)

Bash script used to create a snapshot from your DEV DB (snpashot will be used to update the production DB)

prerequisite:
1. python (https://www.python.org/downloads/) (apt update; apt install python3)
2. pyrseas (https://pyrseas.readthedocs.io/en/latest/install.html) (pip install Pyrseas)
3. pip install psycopg2
4. pip3 install psycopg_c
5. pip3 install psycopg_binary
6. pip3 install libpq

run: 
```bash cms/scripts/pg-dbtoyaml.sh <HOST> <PORT> <USER> <DB> <OUTPUTFILE>```

Script will promt use to enter a password for the DB_USER supplied

env variables: 
1. HOST: DB server hostname/ip 
2. PORT: DB server port
3. USER: User with access to DB
4. DB: Database name to export to yaml
5. OUTPUTFILE: Output path where script should dump yaml file

Links to docks: 
1. https://pyrseas.readthedocs.io/en/latest/dbtoyaml.html?highlight=dbtoyaml

---

## 2. [pg-yamltodb.sh](./pg-yamltodb.sh)

Bash script used to create a diff between snapshot created in section 1 and destenation DB

prerequisite:
1. python (https://www.python.org/downloads/)
2. expect (apt-get update && apt-get install -y expect)
3. pyrseas (https://pyrseas.readthedocs.io/en/latest/install.html)
4. pip install psycopg2
5. pip3 install psycopg_c
6. pip3 install psycopg_binary
7. pip3 install libpq

run: 
```bash cms/scripts/pg-yamltodb.sh <HOST> <PORT> <USER> <PASSWORD> <DB> <INPUTFILE> <OUTPUTFILE>```

env variables: 
1. HOST: DB server hostname/ip 
2. PORT: DB server port
3. USER: User with access to DB
4. PASSWORD: User password
5. DB: Database name to export to yaml
6. INPUTFILE: Path to yaml file to create/update DB from
7. OUTPUTFILE: Where the update SQL file should be saved

---

## 3. [pg-update.sh](./pg-update.sh)

Bash script to create diff by calling section 2 and applying the diff created to the destenation DB (used by docker)

prerequisite:
1. python (https://www.python.org/downloads/)
2. expect (apt-get update && apt-get install -y expect)
3. psql (apt-get update && apt-get install -y postgresql-client)
4. pyrseas (https://pyrseas.readthedocs.io/en/latest/install.html)
5. pip install psycopg2
6. pip3 install psycopg_c
7. pip3 install psycopg_binary
8. pip3 install libpq

run: 
```bash cms/scripts/pg-update.sh```

env variables (Uses docker env variables): 
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
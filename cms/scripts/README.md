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

env variables: 
1. HOST: DB server hostname/ip 
2. PORT: DB server port
3. USER: User with access to DB
4. DB: Database name to export to yaml
5. OUTPUTFILE: Output path where script should dump yaml file

Links to docks: 
1. https://pyrseas.readthedocs.io/en/latest/dbtoyaml.html?highlight=dbtoyaml

## 2. [pg-yamltodb.sh](./pg-yamltodb.sh)

Bash script used to upload yaml snapshot to DB to create/update DB structure

prerequisite:
1. python (https://www.python.org/downloads/)
2. pyrseas (https://pyrseas.readthedocs.io/en/latest/install.html)
3. pip install psycopg2
4. pip3 install psycopg_c
5. pip3 install psycopg_binary
6. pip3 install libpq

run: 
```bash cms/scripts/pg-yamltodb.sh <HOST> <PORT> <USER> <DB> <INPUTFILE> <OUTPUTFILE>```

env variables: 
1. HOST: DB server hostname/ip 
2. PORT: DB server port
3. USER: User with access to DB
4. DB: Database name to export to yaml
5. INPUTFILE: Path to yaml file to create/update DB from
6. OUTPUTFILE: Where the update SQL file should be saved

---

## 3. [pg-diff.py](./pg-diff.py) (Old/Deprecated)

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
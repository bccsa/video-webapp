# Video-webapp CMS Scripts

## Prerequisites
See list in [main readme](../../README.md#prerequisites).

These scripts will use the database environment variables of the parent CMS folder's [.env file](../.env).

## Available scripts
### `pg-dbtoyaml.sh`
Updates the YAML snapshot of the database based on your local database.

```sh
bash pg-dbtoyaml.sh
```

### `pg-yamltodb.sh`
See below.

### `pg-update.sh`
Will call `pg-yamltodb.sh` to create an SQL [diff file](../snapshot/CMS-DIFF.sql) based on differences in the YAML snapshot and your local database, and then apply this SQL query to the database.

Intended to be run from the parent `cms` folder with
```sh
npm run schema:update
```

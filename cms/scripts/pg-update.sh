#! /bin/bash
# read env file 
set -a; source ./.env; set +a;

# Create snapshot from DB
bash ./scripts/pg-yamltodb.sh

# apply diff to server
psql "host=$DB_HOST port=$DB_PORT user=$DB_USER password=$DB_PASSWORD dbname=$DB_DATABASE" < "./snapshot/CMS-DIFF.sql"
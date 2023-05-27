#! /bin/bash

# Create snapshot from DB
bash /usr/src/video-app/update-db/pg-yamltodb.sh $DB_HOST $DB_PORT $DB_USER $DB_PASSWORD $DB_DATABASE "/usr/src/video-app/update-db/CMS-DB.yaml" "/usr/src/video-app/update-db/db-diff.sql"

# Upload diff to server 
psql "host=$DB_HOST port=$DB_PORT user=$DB_USER password=$DB_PASSWORD dbname=$DB_DATABASE" < "/usr/src/video-app/update-db/db-diff.sql"
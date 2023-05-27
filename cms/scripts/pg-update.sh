#! /bin/bash

# Create snapshot from DB
bash "$SCRIPT_PATH" "$DB_HOST" "$DB_PORT" "$DB_USER" "$DB_PASSWORD" "$DB_DATABASE" "$SNAPSHOT_PATH" "$DIFF_PATH"

# Upload diff to server 
psql "host=$DB_HOST port=$DB_PORT user=$DB_USER password=$DB_PASSWORD dbname=$DB_DATABASE" < "$DIFF_PATH"
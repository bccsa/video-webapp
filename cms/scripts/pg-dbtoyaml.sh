#! /bin/bash
# read env file 
set -a; source ../../.env; set +a;
OUTPUTFILE="../snapshot/CMS-DB.yaml"

# Create a snapshot of your dev DB
#dbtoyaml --host $DB_HOST --port $DB_PORT --username $DB_USER --password $DB_DATABASE > $OUTPUTFILE
expect <<END
spawn dbtoyaml --host $DB_HOST --port $DB_PORT --username $DB_USER --password --no-owner --no-privileges $DB_DATABASE -o $OUTPUTFILE
expect "Password: "
send {'$DB_PASSWORD'}
send \r
expect eof
END

# Variables 
#!/usr/bin/expect
INPUTFILE="./snapshot/CMS-DB.yaml"
OUTPUTFILE="./snapshot/CMS-DIFF.sql"

# read env file 
set -a; source ./.env; set +a;

# Create a diff sql between ./snapshot/CMS-DB.yaml and destination DB
expect <<END
spawn yamltodb --host $DB_HOST --port $DB_PORT --username $DB_USER --password $DB_DATABASE $INPUTFILE -o $OUTPUTFILE
expect "Password: "
send {'$DB_PASSWORD'}
send \r
expect eof
END

# Remove all revoke commands from diff 
grep -v "REVOKE" "$OUTPUTFILE" > tmpfile
# Remove empty lines 
grep -v -e '^$' tmpfile > "$OUTPUTFILE"
# Delete temp file 
rm -f tmpfile
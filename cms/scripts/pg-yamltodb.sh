# Varaibrles 
#!/usr/bin/expect -f
HOST=$1
PORT=$2
USER=$3
PASSWORD=$4
DB=$5
INPUTFILE=$6
OUTPUTFILE=$7

# Export diff from dest DB 
expect <<END
spawn yamltodb --host $HOST --port $PORT --username $USER --password $DB $INPUTFILE -o $OUTPUTFILE
expect "Password: " 
send "$PASSWORD\r" 
expect eof
END
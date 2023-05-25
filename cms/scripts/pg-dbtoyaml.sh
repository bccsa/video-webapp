# Varaibrles 
HOST=$1
PORT=$2
USER=$3
DB=$4
OUTPUTFILE=$5

# Create snapshot
dbtoyaml --host $HOST --port $PORT --username $USER --password $DB > $OUTPUTFILE

# Varaibrles 
HOST=$1
PORT=$2
USER=$3
DB=$4
INPUTFILE=$5
OUTPUTFILE=$6

# Create snapshot
yamltodb --host $HOST --port $PORT --username $USER --password $DB $INPUTFILE > $OUTPUTFILE
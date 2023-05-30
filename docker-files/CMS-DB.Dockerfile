# Python version
FROM python:3.8

# Create app work dir
WORKDIR /usr/src/video-webapp/update-db

# Copy Script files
COPY cms/scripts /usr/src/video-webapp/update-db/

# Copy DB snapshot
COPY cms/snapshot/CMS-DB.yaml /usr/src/video-webapp/update-db/CMS-DB.yaml

# Update pip
RUN python -m pip install --upgrade pip

# install psql
RUN apt-get update && apt-get install -y postgresql-client expect

# Install pip packages
RUN pip install Pyrseas psycopg2 psycopg_c psycopg_binary

# Set ENV Varibles 
ENV SCRIPT_PATH="/usr/src/video-webapp/update-db/pg-yamltodb.sh"
ENV SNAPSHOT_PATH="/usr/src/video-webapp/update-db/CMS-DB.yaml"
ENV DIFF_PATH="/usr/src/video-webapp/update-db/db-diff.sql"

# Update DB with script
CMD ["bash", "/usr/src/video-webapp/update-db/pg-update.sh"]
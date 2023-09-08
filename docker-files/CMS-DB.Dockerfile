# Python version
FROM python:3.8

# Create app work dir
WORKDIR /usr/src/video-webapp/update-db

# Bundle app source
COPY cms/scripts /usr/src/video-webapp/update-db/scripts
COPY cms/snapshot/CMS-DB.yaml /usr/src/video-webapp/update-db/snapshot/CMS-DB.yaml

# Install prerequisites
RUN python -m pip install --upgrade pip
RUN apt-get update && apt-get install -y postgresql-client expect
RUN pip install Pyrseas psycopg2 psycopg_c psycopg_binary

# run DB update script when container starts up
WORKDIR /usr/src/video-webapp/update-db
CMD ["bash", "scripts/pg-update.sh"]

# Node version
FROM python:3.8

# Create app work dir
WORKDIR /usr/src/video-webapp

# Install Python
RUN apt-get update && apt-get install -y nodejs npm postgresql-client expect
RUN python3 -m pip install --upgrade pip
RUN pip install Pyrseas psycopg2 psycopg_c psycopg_binary

# Copy package/package-lock files
COPY cms/package*.json /usr/src/video-webapp/

# Install NPM pacakges 
RUN npm --prefix /usr/src/video-webapp ci --omit=dev

# Copy DB upgrade scripts
COPY cms/scripts /usr/src/video-webapp/update-db/scripts

# Copy directus and postgress DB diff yaml files
COPY cms/snapshot/directus-db.yaml /usr/src/video-webapp/update-db/snapshot/directus-db.yaml
COPY cms/snapshot/CMS-DB.yaml /usr/src/video-webapp/update-db/snapshot/CMS-DB.yaml

# Initialise and migrate the Directus DB, migrate non-directus DB schema changs, and start the server
CMD ["/bin/bash", "-c", "cd /usr/src/video-webapp; \
npx directus bootstrap; \
npx directus schema apply --yes ./update-db/snapshot/directus-db.yaml; \
cd update-db/scripts; \
bash pg-update.sh; \
cd ../..; \
npx directus start"]

# Test comment 
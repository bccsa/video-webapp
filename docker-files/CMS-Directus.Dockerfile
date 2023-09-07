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

# FIXME probably broken now
COPY cms/scripts /usr/src/video-webapp/scripts

# Copy directus and postgress DB diff yaml files
COPY cms/snapshot/directus-db.yaml /usr/src/video-webapp/snapshot/directus-db.yaml
COPY cms/snapshot/CMS-DB.yaml /usr/src/video-webapp/snapshot/CMS-DB.yaml

# Initialise and migrate the Directus DB, migrate non-directus DB schema changs, and start the server
CMD ["/bin/bash", "-c", "cd /usr/src/video-webapp; \
npx directus bootstrap; \
npm run schema:update; \
npx directus start"]

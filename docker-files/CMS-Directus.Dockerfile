# Node version
FROM node:18

# Create app work dir
WORKDIR /usr/src/video-webapp

# Install Python
RUN apt-get update && apt-get install -y python3 postgresql-client expect
RUN python -m pip install --upgrade pip
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

# Initialise and migrate the Directus DB, and start the server
CMD ["/bin/bash", "-c", "cd /usr/src/video-webapp; \
npx directus bootstrap; \
npx directus schema apply --yes ./update-db/snapshot/directus-db.yaml; \
cd update-db/scripts; \
bash pg-update.sh; \
cd ../..; \
npx directus start"]

# Migrate database structures not migrated by directus' migration tool
# RUN cd update-db/scripts; bash pg-update.sh;

# Start server 
# CMD ["npm", "--prefix /usr/src/video-webapp", "run", "prod"]

# Test comment 1
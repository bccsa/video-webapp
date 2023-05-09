# Node version
FROM node:18

# Create app work dir
WORKDIR /usr/src/app-bcc-africa-cms

# Copy package/package-lock files
COPY package*.json /usr/src/app-bcc-africa-cms/

# Install NPM pacakges 
RUN npm --prefix /usr/src/app-bcc-africa-cms ci --omit=dev

# Start server 
CMD [ "npx", "directus start" ]
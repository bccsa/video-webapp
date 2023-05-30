# Node version
FROM node:18

# Create app work dir
WORKDIR /usr/src/video-webapp

# Copy package/package-lock files
COPY cms/package*.json /usr/src/video-webapp/

# Install NPM pacakges 
RUN npm --prefix /usr/src/video-webapp ci --omit=dev

# Start server 
CMD ["npm", "--prefix /usr/src/video-webapp", "run", "prod"]
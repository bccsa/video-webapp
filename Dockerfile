# Node version
FROM node:18

# Create app work dir
WORKDIR /usr/src/video-webapp

# Copy package lock files
COPY client/package*.json /usr/src/video-webapp/client/
COPY server/package*.json /usr/src/video-webapp/server/

# Bundle app source
COPY client /usr/src/video-webapp/client
COPY server /usr/src/video-webapp/server
COPY .gitmodules /usr/src/video-webapp/.gitmodules
COPY .git /usr/src/video-webapp/.git

# Install NPM pacakges 
RUN npm --prefix /usr/src/video-webapp/client ci --omit=dev
RUN npm --prefix /usr/src/video-webapp/server ci --omit=dev

# Init sub modules 
RUN git init
RUN git submodule update --init --recursive

# Start server 
CMD [ "node", "/usr/src/video-webapp/server/index.js" ]
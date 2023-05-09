# Node version
FROM node:18

# Set nnvironment
ENV KEY a08bb544-53ed-49ad-8caf-2cdca17a9ccd
ENV SECRET FoDV8N20lO6J13rrr_4y01YbxBtDbGZD

# Create app work dir
WORKDIR /usr/src/app-bcc-africa-cms

# Copy package/package-lock files
COPY package*.json /usr/src/app-bcc-africa-cms/

# Install NPM pacakges 
RUN npm --prefix /usr/src/app-bcc-africa-cms ci --omit=dev

# Start server 
RUN npm --prefix /usr/src/app-bcc-africa-cms run prod
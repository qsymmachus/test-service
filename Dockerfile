FROM node:8

# Create working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY server.js .

# Run the app
EXPOSE 8080
CMD ["npm", "start"]

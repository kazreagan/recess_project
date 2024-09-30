# Specify the base image with the desired Node.js version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install --force --verbose

# Copy the rest of the application files
COPY . .

# List files for debugging
RUN ls -la

# Build the app
RUN npm run build || { echo 'Build failed'; exit 1; }

# Expose the port the app runs on
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# Run the app
CMD ["npm", "start"]

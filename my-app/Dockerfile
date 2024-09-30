# Specify the base image with the desired Node.js version
FROM node:18-alpine


# Set the working directory inside the container
WORKDIR /app

# Copy the package.jsonn and package-lock.json files
COPY package*.json ./
RUN npm install --force --verbose

# Install the dependencies with verbose output for debugging
RUN npm install --verbose

# Copy the rest of the application files
COPY . .

# Build the app (only necessary for production or if you have a build step)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the environment to production (optional)
ENV NODE_ENV=production

# Run the app
CMD ["npm", "start"]


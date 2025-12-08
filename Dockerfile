# Use Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY solution.js .
COPY public/ ./public/

# Expose port 3000
EXPOSE 3000

# Start application
CMD ["node", "solution.js"]

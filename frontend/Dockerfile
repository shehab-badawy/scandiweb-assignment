FROM node:20-alpine

WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Vite needs --host to accept connections from outside the container
CMD ["npm", "run", "dev", "--", "--host"]
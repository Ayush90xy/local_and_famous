FROM node:20-alpine
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install deps
RUN npm install

# Copy source
COPY . .

EXPOSE 4000
CMD ["npm", "run", "dev"]

# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Install only what's in lockfile for reproducibility
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Env (Northflank will override with real values)
ENV PORT=4000
EXPOSE 4000

# Start the server
CMD ["node", "src/index.js"]

# frontend/Dockerfile
# 1) Build stage
FROM node:20-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
# VITE_API_BASE is read at build-time; we’ll override at runtime by serving a small env.js (see next step).
RUN npm run build

# 2) Runtime stage: Nginx serves the static assets
FROM nginx:1.25-alpine AS runtime
WORKDIR /usr/share/nginx/html

# Copy build output
COPY --from=build /app/dist ./

# Our nginx config (history API fallback + gzip)
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

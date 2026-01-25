# Multi-stage Dockerfile for Vite React SPA

# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_API_BASE_URL

# Set environment variables for build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the application
RUN npm run build

# Stage 2: Production (nginx)
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

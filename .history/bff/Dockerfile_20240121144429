FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --quiet
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NODE_OPTIONS="--max-old-space-size=2048"
WORKDIR /usr/src/app
USER node
COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD ["sh", "-c", "node dist/main"]
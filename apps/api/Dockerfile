# ---------------------------
# Base Stage: Install deps
# ---------------------------
FROM node:20-alpine AS base
WORKDIR /app


COPY package*.json turbo.json ./

COPY apps/api/package*.json ./apps/api/
COPY apps/backend/package*.json ./apps/backend/
COPY packages/postgres-prisma ./packages/postgres-prisma


RUN npm ci

# ---------------------------
# Builder Stage: Build API
# ---------------------------
FROM base AS builder

COPY . .

RUN npx turbo build --filter=api

# ---------------------------
# Runtime Stage: Slim final image
# ---------------------------
FROM node:20-alpine AS runner
WORKDIR /app


RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 apiuser


COPY --from=builder --chown=apiuser:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=apiuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/package*.json ./

USER apiuser
EXPOSE 3000
ENV PORT=3000

CMD ["node", "dist/index.js"]

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/package.json

RUN npm install -g pnpm && pnpm install

COPY frontend ./frontend
# 👇 This is needed only for build-time
COPY typescript-config ./typescript-config
COPY frontend/tsconfig.json ./frontend/tsconfig.json

RUN pnpm --filter @repo/frontend build

# Final stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/frontend/.next .next
COPY --from=builder /app/frontend/public public
COPY --from=builder /app/frontend/package.json package.json
COPY --from=builder /app/node_modules node_modules

EXPOSE 3002

CMD ["node_modules/.bin/next", "start"]

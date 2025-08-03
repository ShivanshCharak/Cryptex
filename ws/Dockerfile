FROM node:20-alpine AS base

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY ws/package.json ./ws/package.json

RUN pnpm install

COPY ws ./ws

RUN pnpm --filter ws run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm
COPY --from=base /app ./
CMD ["node", "ws/dist/index.js"]


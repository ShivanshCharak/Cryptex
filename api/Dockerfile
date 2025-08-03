FROM node:20-alpine AS base

WORKDIR /app

RUN npm i -g pnpm
COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY api/package*.json ./api/package.json
COPY backend/package*.json ./backend/package.json
COPY postgres-prisma/package*.json ./postgres-prisma/package.json

RUN pnpm install

COPY api ./api
COPY backend ./backend
COPY postgres-prisma ./postgres-prisma

RUN pnpm --filter @repo/postgres-prisma run prisma:generate
RUN pnpm --filter @repo/backend run build
RUN pnpm  --filter @repo/api run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

COPY --from=base /app ./
CMD [ "node","api/dist/index.js" ]



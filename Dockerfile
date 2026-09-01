FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat python3 make g++
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate

WORKDIR /server

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/storefront/package.json ./apps/storefront/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN cd /server/apps/backend && pnpm exec medusa build


FROM node:20-alpine

RUN apk add --no-cache libc6-compat python3 make g++
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate

WORKDIR /app

COPY --from=builder /server/apps/backend/.medusa/server /app

RUN pnpm install --prod --frozen-lockfile=false

COPY start-backend.sh /start-backend.sh
RUN chmod +x /start-backend.sh

EXPOSE 9000

CMD ["/start-backend.sh"]

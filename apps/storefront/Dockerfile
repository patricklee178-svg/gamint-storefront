FROM node:20-alpine

RUN apk add --no-cache libc6-compat
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/storefront/package.json ./apps/storefront/package.json

RUN pnpm install --frozen-lockfile

COPY apps/storefront ./apps/storefront

WORKDIR /app/apps/storefront

EXPOSE 8000

CMD ["pnpm", "dev"]

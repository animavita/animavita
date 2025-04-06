FROM node:20-slim AS base
RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  build-essential \
  && rm -rf /var/lib/apt/lists/*
RUN npm i -g pnpm@9.15.9

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

FROM dependencies as pruned
WORKDIR /app
RUN pnpm --filter backend deploy pruned

FROM base as development
WORKDIR /app
COPY --from=pruned /app/pruned .

FROM base as deploy
WORKDIR /app
ENV NODE_ENV=production
COPY --from=pruned /app/pruned/dist .
COPY --from=pruned /app/pruned/node_modules node_modules
EXPOSE 3001
ENTRYPOINT ["node", "main.js"]


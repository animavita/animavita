FROM node:20.13.1 AS base
RUN npm i -g pnpm@9.15.9

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
RUN pnpm install --frozen-lockfile
COPY . .

FROM dependencies as pruned
WORKDIR /app
RUN pnpm --filter backend build
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


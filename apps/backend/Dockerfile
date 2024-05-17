FROM node:20.13.1 AS base
RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY . .
# workaround 
# https://github.com/animavita/animavita/pull/134
RUN rm .npmrc
RUN mv .npmrc-default-node-linker .npmrc
RUN pnpm install

FROM dependencies as build
RUN pnpm -r build

FROM build as pruned
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


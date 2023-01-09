FROM node:14 as base

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY . .

# workaround
RUN rm .npmrc
RUN mv .npmrc-default-node-linker .npmrc

RUN pnpm install -r --offline 
RUN pnpm -r build

########################

FROM base as pruned
RUN pnpm --filter backend deploy pruned

FROM node:16-alpine
WORKDIR /app

ENV NODE_ENV=development

COPY --from=pruned /app/pruned/dist .
COPY --from=pruned /app/pruned/node_modules node_modules

EXPOSE 3001

ENTRYPOINT ["node", "main.js"]


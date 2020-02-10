import 'isomorphic-fetch';

import {koaPlayground} from 'graphql-playground-middleware';
import Koa, {Context} from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa-cors';
import graphqlHttp, {OptionsData} from 'koa-graphql';
import koaLogger from 'koa-logger';
import Router from '@koa/router';

import {JWT_KEY} from './common/config';
import schema from './schema';
import {KoaContextExt} from './types';
import {getDataloaders} from './helper';
import * as loaders from './loaders';
import {standardQueue} from './common/queue';

const app = new Koa<any, KoaContextExt>();
if (process.env.NODE_ENV === 'production') {
  app.proxy = true;
}
app.keys = [JWT_KEY];

const router = new Router<any, KoaContextExt>();

// if production than trick cookies library to think it is always on a secure request
if (process.env.NODE_ENV === 'production') {
  app.use((ctx, next) => {
    ctx.cookies.secure = true;
    return next();
  });
}

// needed for sentry to log data correctly
app.use(bodyParser());

if (process.env.NODE_ENV !== 'test') {
  app.use(koaLogger());
}

app.use(convert(cors({maxAge: 86400, origin: '*'})));

app.use(async (ctx, next) => {
  ctx.dataloaders = getDataloaders(loaders);
  await next();
});

router.get('/health', async ctx => {
  try {
    standardQueue.send(['StandardQueueHealth'], (err, info) => {
      if (err) console.log(err);
    });

    ctx.body = 'Animavita its good to go';
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.toString();
    ctx.status = 400;
  }
});

if (process.env.NODE_ENV !== 'production') {
  router.all(
    '/playground',
    koaPlayground({
      endpoint: '/graphql',
    }),
  );
}

router.all(
  '/graphql',
  convert(
    graphqlHttp(
      // @ts-ignore
      async (request, ctx, koaContext: Context & KoaContextExt): Promise<OptionsData> => {
        const {dataloaders} = koaContext;

        return {
          graphiql: process.env.NODE_ENV === 'development',
          schema,
          rootValue: {
            request: ctx.req,
          },
          context: {
            dataloaders,
          },
          formatError: error => {
            if (error.name && error.name === 'BadRequestError') {
              ctx.status = 400;
              ctx.body = 'Bad Request';
              return {
                message: 'Bad Request',
              };
            }

            if (error.path || error.name !== 'GraphQLError') {
              // eslint-disable-next-line no-console
              console.error(error);
            } else {
              // eslint-disable-next-line no-console
              console.log(`GraphQLWrongQuery: ${error.message}`);
            }

            // eslint-disable-next-line no-console
            console.error('GraphQL Error', {error});

            if (process.env.NODE_ENV !== 'production') {
              return {
                message: error.message,
                locations: error.locations,
                stack: error.stack,
              };
            } else {
              ctx.status = 400;
              ctx.body = 'Bad Request';
              return {
                message: 'Bad Request',
              };
            }
          },
        };
      },
    ),
  ),
);

app.use(router.routes()).use(router.allowedMethods());

export default app;

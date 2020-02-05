import 'core-js';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';

import schema from '../src/schema';

const writeFileAsync = promisify(fs.writeFile);

const generateSchema = async (schema, relativePath) => {
  const result = await graphql(schema, introspectionQuery);

  if (result.errors) {
    // eslint-disable-next-line
    console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2));
  } else {
    await writeFileAsync(path.join(__dirname, `${relativePath}/schema.json`), JSON.stringify(result, null, 2));
  }
};

(async () => {
  const configs = [
    {
      schema,
      path: '../../schema',
    },
  ];

  for await (const config of configs) {
    // await generateSchema(config.schema, config.path);
    await writeFileAsync(path.join(__dirname, `${config.path}/schema.graphql`), printSchema(config.schema));
  }

  process.exit(0);
})();

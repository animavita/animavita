import * as CDK from '@aws-cdk/core';

import {GraphQLStack} from './stacks/GraphQLStack';

const app = new CDK.App();

const mode = app.node.tryGetContext('mode')
  ? app.node.tryGetContext('mode').replace(/^\w/, (c: string) => c.toUpperCase())
  : 'Development';

new GraphQLStack(app, `Animavita${mode}GraphQLStack`);

app.synth();

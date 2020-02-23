import * as CDK from '@aws-cdk/core';

import {GraphQLStack} from './stacks/GraphQLStack';
import {WebStack} from './stacks/WebStack';

const app = new CDK.App();

const mode = app.node.tryGetContext('mode')
  ? app.node.tryGetContext('mode').replace(/^\w/, (c: string) => c.toUpperCase())
  : 'Development';

new GraphQLStack(app, `Animavita${mode}GraphQLStack`);
new WebStack(app, `Animavita${mode}WebStack`);

app.synth();

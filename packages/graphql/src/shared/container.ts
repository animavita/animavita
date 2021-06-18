import {createContainer} from 'awilix';

import * as User from '../modules/user/container';

import * as Providers from './providers/container';

export type Container = User.Container & Providers.Container;

const container = createContainer<Container>();

Providers.register(container);
User.register(container);

export default container;

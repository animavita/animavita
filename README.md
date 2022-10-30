## Animavita

### Pre-requisites

- _Node:_ `16.17.1` or higher.
- _Npm:_ `7.5.2` or higher.

### Getting started

Clone the project from Github :

```sh
git clone --branch v2 git@github.com:animavita/animavita.git
cd animavita
```

Install dependencies:

```sh
$ pnpm install
```

From the backend app level, copy the env file:

```sh
$ cp apps/backend/.env.example apps/backend/.env
```

### Docker

We have a `docker-compose` file that sets up a mongodb database. Just run:

```sh
$ docker-compose up -d
```

Alternatively you can setup your own mongo database without docker.

Then, run the apps:

```sh
$ pnpm --filter backend start
$ pnpm --filter mobile start
```

<h1 align="center">
  How to install
</h1>

# Contributing

Contributions, issues and feature requests are very welcome.

## Docker

If you have docker installed, you don't need to set the AWS env vars, install MongoDB or create an AWS account because we've prepared a docker-compose to run a local AWS instance with [localstack](https://github.com/localstack/localstack).

## Pre-requisites

- _Node:_ `^14.17.0` or higher.
- _Npm:_ `6.0.0` or higher.
- _Yarn:_ `^1.7.0` or higher.
- _MongoDB:_ `4.0.0` or higher.

## Pre-requisite Accounts

- _AWS_: https://aws.amazon.com/
- _Facebook Developer_: https://developers.facebook.com/
  You can use [Graph API Explorer](https://developers.facebook.com/tools/explorer/) to generate access tokens.
- _Google Maps_: https://console.cloud.google.com/google/maps-apis/

## Getting started

Clone the project from Github :

```sh
git clone git@github.com:wendelfreitas/animavita.git
cd animavita
```

Install dependencies:

```sh
$ yarn
```

### GraphQL

Create a **.env** file in _packages/graphql_ folder and copy the content of **.env.example**

```bash
# Environment
NODE_ENV=

# Front Security
JWT_KEY=

# AWS
AWS_S3_BUCKET_NAME=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_STANDARD_QUEUE_URL=

MONGO_URI=
```

Run

```bash
$ yarn graphql
```

If everything is ok, you will be able to open GraphCool at:

```bash
http://localhost:5001/playground
```

### GraphQL with docker

Run

```sh
$ yarn graphql:infra
$ yarn graphql
```

### Relay

Create a **environment.ts** file in _packages/relay_ folder and copy the content of **environment.example.ts**

Run

```sh
$ yarn relay
```

### Expo

Create a **environment.ts** file in _packages/expo_ folder and copy the content of **environment.example.ts**

Run

```sh
$ yarn android
```

### Backend Architecture

We decided to follow some DDD principals to guide our backend architecture. Here is a quick glance of what we expect when of new contributions in the backend project. How we organize our project:

- `module`: container for a specific set of classes/functions related to the same domain;
  - `domain`: store all the classes that models every entity or aggregator for a specific domain.
  - `app`: It's a business layer that store all useCases with the business rules that couldn't be defined in the domain model.
  - `infra`: handles the infrastructure layer dealing with database connection and external api communication through repositories.
  - `presentation`: takes care of the data presentation. Control the routes or graphQL schemas and its respective controllers.
  - `providers`: a set of useful services not necessarily connected to a specific domain. Ex.: a provider that deals with JWT authentication.
- `shared`: container for a set of classes/functions that share more that one domain or doesn't belong to a specific one. It may have the same folders as `modules`

Thanks ❤️

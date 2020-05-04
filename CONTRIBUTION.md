<h1 align="center">
  How to install
</h1>

# Contributing

Contributions, issues and feature requests are very welcome.

## Pre-requisites

-   _Node:_ `^9.0.0` or higher.
-   _Npm:_ `6.0.0` or higher.
-   _Yarn:_ `^1.7.0` or higher.
-   _MongoDB:_ `4.0.0` or higher.

## Pre-requisite Accounts

-   _AWS_: https://aws.amazon.com/
-   _Facebook Developer_: https://developers.facebook.com/
-   _Google Maps_: https://console.cloud.google.com/google/maps-apis/

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

Thanks :hearts:

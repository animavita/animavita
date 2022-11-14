> **Important note:** we've been improving our docs for v2. Please refer to our discord or to [this discussion](https://github.com/animavita/animavita/discussions/120) if you face any problems while setting up the project.
>
> **Thanks! :heart:**

## Contributing

### Pre-requisites

- _Node:_ `16.17.1` or higher.
- _Npm:_ `7.5.2` or higher.

### Getting started

Fork the project, then clone it:

```sh
git clone --branch v2 git@github.com:[your-github-user]/animavita.git
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

Build the shared packages:

```sh
$ pnpm --filter "./shared/**" run build

// Be aware that whenever you make a change on shared packages
// you must rebuild it. We are going to automate this soon.
```

Then, run the apps:

```sh
$ pnpm --filter backend start
$ pnpm --filter mobile start
```

### Sending a pull request

#### **PR description**

- Prefer small pull requests focused on one change.
- Verify that typescript, eslint and all tests are passing.
- Preview the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.

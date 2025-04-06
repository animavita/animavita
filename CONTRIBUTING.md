> **Important note:** we've been improving our docs for v2. Please refer to our discord or to [this discussion](https://github.com/animavita/animavita/discussions/120) if you face any problems while setting up the project.
>
> **Thanks! :heart:**

## Contributing

### Pre-requisites

- Linux based distro or MacOS (we don't recommend Windows due to compatibility issues)
- _Node:_ `20.13.1` or higher.
- _Npm:_ `10.5.2` or higher.
- _Pnpm:_ `9.15.9`

### Getting started
> The `master` and `next` are stale branches, please do not use them.
>

Fork the project, then clone it. Make sure you're cloning v2 branch:

```sh
git clone --branch v2 git@github.com:[your-github-user]/animavita.git
cd animavita
```

Install dependencies:

```sh
$ pnpm install
```

[Click here if you want to work only on the mobile app](#developing-with-staging-backend)

### Running the infra & backend with docker

We have a `docker-compose` file that sets up a mongodb database and the backend app for you. Just run:

```sh
$ docker-compose up -d
```

### 📦 Dependency Caching Strategy

We're using an anonymous volume for node_modules to ensure consistent, cross-platform dependency management. This means the container handles installing and storing node_modules, rather than relying on your local system.
When the container starts for the first time, Docker creates an anonymous volume for /app/node_modules. This allows the container to manage dependencies internally, without interference from the host file system.

> [!WARNING]  
> Rebuilding After Dependency Changes
> Whenever you add, remove, or update dependencies (e.g. using pnpm add), you'll need to rebuild the container and discard the old volume, so that dependencies can be reinstalled cleanly:

```sh
$ docker-compose up --build --force-recreate -V
```

### Running without docker

Alternatively you can setup your own mongo database without docker. Then, from the backend app level, copy the env file:

```sh
$ cp apps/backend/.env.example apps/backend/.env
```

To use the geolocation service when running the mobile app on the web version, you need to have an API key from Opencage. You can obtain an API key for free by registering on their website, and there is no need to register a payment method for this. After obtaining the API key, add it to the `OPENCAGE_KEY` environment variable.

Then, run the app:

```sh
$ pnpm backend start
```

### Running the mobile app


Then, run the app:

```sh
$ pnpm mobile start
```

### Developing with staging backend

In this case, you don't need to worry about the backend part.  We have a hosted staging environment you can use while developing locally. Keep in mind it might be unstable, so in case you face any problems follow the above steps to get the backend running locally as well.

To point the app to staging, create a .env file and set the `ENV` variable to `staging`.

```sh
cp .env.example .env
```

Then, run the app:

```sh
pnpm mobile start
```

### Sending a pull request

#### **PR description**

- Prefer small pull requests focused on one change.
- Verify that typescript, eslint and all tests are passing.
- Preview the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.

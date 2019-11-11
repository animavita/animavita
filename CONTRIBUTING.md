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
-   _One Signal_: https://onesignal.com/

## Getting started

Clone the project from Github :

```sh
git clone git@github.com:wendelfreitas/animavita.git
cd animavita
```

Install dependencies in server:

```sh
$ cd server
$ yarn or npm install
```

Create a **.env** file in _server_ folder and copy the content of **.env.example**

```bash
# Your mongodb database url
MONGO_URL=

# String to generate a JWT token
APP_SECRET=

# Facebook ID and Client Secret in your app on Facebook Developer
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# One signal key and app key in your account settings in the admin panel in One Signal
ONE_SIGNAL_KEY=
ONE_SIGNAL_APP_KEY= # Same used in mobile constant

# AWS S3 configurations
S3_KEY=
S3_SECRET=
S3_BUCKET=
S3_REGION=

# Google Maps (Geolocation, etc) api key to get user location on login first time at device.
 GOOGLE_API_KEY=
```

If you're using docker, execute

```bash
$ docker-compose up
```

If everything is ok, you will be able to open GraphCool at:

```bash
http://localhost:4000/playground
```

Install dependencies in mobile:

```sh
$ cd mobile
$ yarn or npm install
```

Open the file **constants.js** in mobile/src/utils

```js
# Put your One Signal App Key to receive push notifications
const ONE_SIGNAL_APP_KEY = '';

# Put your machine IP to connect to the server
const APP_SERVER = '';
```

Open the file **strings.xml** in _mobile/android/src/main/res/values_ and put your facebook app id's

```xml
<resources>
    <string name="app_name">Animavita</string>
    <string name="facebook_app_id">Your facebook app id</string>
    <string name="fb_login_protocol_scheme">Your login protocol id in the facebook app</string>
</resources>
```

Run the application

```sh
$ cd mobile
$ react-native run-android
```

Thanks :hearts:

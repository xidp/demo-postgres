# Demo-postgres

## Description

This is an automatic boilerplate for a new NestJS application.
Please edit this docs ...

## Git clone and initial setup

```sh
# clone this repo
$ git clone https://github.com/xidp/demo-postgres.git

# cd into it
$ cd demo-postgres

# run install script
$ ./run-install.sh
```

**The initial script will:**
- create a ".env" file from env.example
- install atlas cli (the tool to manage migrations) 
- spin up a docker database, using included docker-compose.yaml file
- perform a initial database migration with "todo" entity included in demo
- run "npm install" to fetch project dependencies


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## :whale: Deploy local database

```sh
# setup you .env file

# run:
$ docker compose up -d
```

## :whale: Build container image

```sh
# you won't need it, because there is a ci/cd job, but ...
$ docker build -t "demo-postgres:0.1.0" .
```


## Dependencies

- postgres

## Links

- Dev Team: idp_training
- Team Lead: TODO
- Website: https://demo-postgres-dev.127.0.0.1.nip.io

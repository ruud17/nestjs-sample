## REST API service based on Node.js

## Description
This solution represents REST API service based on [Nest](https://github.com/nestjs/nest) framework that handles Import requests.
The API should expose endpoints to:

`POST` a request for a new Import job. Invalid requests should return an error. The request must have the following schema:

```
{
  bookId: string,
  type: "word" | "pdf" | "wattpad" | "evernote",
  url: string
}
```
`GET` a list of Import requests, grouped by their current state (pending | finished).

Import requests should be created with a pending state and a `created_at` timestamp. It should take 60 seconds. After the specified time, the state should be updated from pending to finished and update an `updated_at` timestamp.


## Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Installation

1. copy `.env.example` -> `.env` - setup env vars
2. Install dependencies and run docker containers

```
$ npm install
$ npm run docker-up
```

As a result you should have two running docker containers. One is for Mongo DB and another related to Node REST API.

*Note*: MongoDB was used in this sample, but the solution is generic and can work with any database with minor adjustment if needed.

To stop and remove running containers:

```
$ npm run docker-down
```
## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
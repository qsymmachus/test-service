Test Service
============

This is a simple service I use to test and experiment with, especially on new infrastructure.

For now, it's just a Node HTTP server with a single `GET` endpoint.

Usage
-----

The following guide assumes you already have `node` and `npm` installed.

Install all dependencies:

```
npm install
```

Spin up the server locally:

```
npm start
```

By default, the server is exposed on [http://localhost:8080](http://localhost:8080)

Docker
------

The service can also run as a docker container. Take a look at `Dockerfile` to see how it works.

I've also created some handy scripts to make it easier to run common docker tasks (check out `/scripts`). You must have docker installed locally for these to work.

To build the container:

```
npm run-script dock-build
```

To run the container:

```
npm run-script dock-run
```

To stop the container:

```
npm run-script dock-stop
```

The docker container maps the server to port `8080`, so you can access it at [http://localhost:8080](http://localhost:8080). I might make this port configurable later.

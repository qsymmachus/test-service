#! /bin/bash

# Starts running a docker container using the test-service image. This image must have been built locally first.
docker run -p 8080:8080 -d test-service

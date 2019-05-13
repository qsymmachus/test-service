#! /bin/bash

# Stops running containers using the 'test-service' image.
docker ps -qf "ancestor=test-service" | xargs -o -I CONTAINER_ID docker stop CONTAINER_ID

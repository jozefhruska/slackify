#!/bin/bash

docker cp constraints.sql slackify_db:/home/
docker exec -u postgres slackify_db psql --dbname=postgres --username postgres -f /home/constraints.sql
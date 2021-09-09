#!/usr/bin/env bash
workspace=$(cd $(dirname $0) && pwd -P)

cd $workspace
TAG=keycloak-demo:v1
docker build . -t $TAG
docker run --rm -it -p 8080:8080 $TAG

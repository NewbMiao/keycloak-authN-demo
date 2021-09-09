#!/usr/bin/env bash
workspace=$(cd $(dirname $0) && pwd -P)

cd $workspace
TAG=react-demo:v1
docker build . -t $TAG
docker run --rm -it -p 3000:3000 $TAG

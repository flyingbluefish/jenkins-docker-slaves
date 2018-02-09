#!/bin/bash

SLAVEDIR=~/ci/slaves/1
SLAVEPORT=11022

mkdir -p $SLAVEDIR

docker run \
    --name "ci-slave" \
    -p $SLAVEPORT:22 \
    -v $SLAVEDIR:/var/lib/jenkins \
    -d \
    ci/slave



#!/bin/bash

# change URL
export URL=http://192.168.116.207:8880/computer/2/slave-agent.jnlp

SLAVEDIR=~/ci/slaves/3
SLAVEPORT=12022

mkdir -p $SLAVEDIR

docker run \
    --name "ci-jnlp-slave" \
    -p $SLAVEPORT:22 \
    -v $SLAVEDIR:/var/lib/jenkins \
    -e URL=$URL \
    -d \
    ci/jnlp-slave



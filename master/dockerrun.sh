#!/bin/bash

LOGDIR=~/.ci/master/log
HOMEDIR=~/.ci/master/home
MASTERPORT=8880

mkdir -p $LOGDIR
mkdir -p $HOMEDIR

echo "jenkins port is $MASTERPORT"

docker run \
    --name "ci-master" \
    -p $MASTERPORT:8080 \
    -p 10080:10080 \
    -e JENKINS_JNLP_PORT=10080 \
    -d \
    -v $LOGDIR:/var/log/jenkins \
    -v $HOMEDIR:/var/lib/jenkins \
    ci/master





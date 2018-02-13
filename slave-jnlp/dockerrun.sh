#!/bin/bash

#
# 1 - node id
# 2 - jnlp url
# 3 - ssh port
# 4 - slave workspace
#


# change URL
export NODEID=$1
export URL=$2
export PORT=$3
export WS=$4

SLAVEDIR=$WS/$NODEID
SLAVESSHPORT=$PORT

mkdir -p $SLAVEDIR

docker run \
    --name "ci-jnlp-slave-"$NODEID \
    -p $SLAVESSHPORT:22 \
    -v $SLAVEDIR:/var/lib/jenkins \
    -e URL=$URL \
    -d \
    ci/jnlp-slave



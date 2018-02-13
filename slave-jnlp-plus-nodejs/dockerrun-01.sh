#!/bin/bash

bash -x ./dockerrun.sh 01  \
   http://192.168.116.207:8880/computer/01/slave-agent.jnlp \
   12122 \
   ~/.ci/slaves


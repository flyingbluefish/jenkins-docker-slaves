#!/bin/bash


bash -x ./dockerrun.sh 02  \
   http://192.168.116.207:8880/computer/02/slave-agent.jnlp \
   12222 \
   ~/.ci/slaves


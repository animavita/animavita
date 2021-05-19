#!/bin/sh
echo "Init localstack sqs"
awslocal sqs create-queue --queue-name animavita

yarn workspace @animavita/relay prepare:build
yarn workspace @animavita/expo prepare:build

yarn workspace @animavita/aws deploy AnimavitaStagingWebStack \
  -c mode=staging \
  -c hostedZoneId=$HOSTED_ZONE_ID \
  -c certificateArn=$CERTIFICATE_ARN \
  --require-approval=never

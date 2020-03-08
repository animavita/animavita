yarn workspace @animavita/relay prepare:build
yarn workspace @animavita/expo prepare:build
yarn workspace @animavita/graphql prepare:build

yarn workspace @animavita/aws deploy AnimavitaStagingGraphQLStack \
  -c mode=staging \
  -c pkg=graphql \
  -c hostedZoneId=$HOSTED_ZONE_ID \
  -c certificateArn=$CERTIFICATE_ARN \
  -c JWT_KEY=$JWT_KEY \
  -c MONGO_URI=$MONGO_URI \
  --require-approval=never

yarn workspace @animavita/aws deploy AnimavitaStagingWebStack \
  -c mode=staging \
  -c pkg=web \
  -c hostedZoneId=$HOSTED_ZONE_ID \
  -c certificateArn=$CERTIFICATE_ARN \
  --require-approval=never

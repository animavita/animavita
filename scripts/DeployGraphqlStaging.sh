yarn workspace @animavita/graphql prepare:build

yarn workspace @animavita/aws deploy AnimavitaStagingGraphQLStack \
  -c mode=staging \
  -c hostedZoneId=$HOSTED_ZONE_ID \
  -c certificateArn=$CERTIFICATE_ARN \
  -c JWT_KEY=$JWT_KEY \
  -c MONGO_URI=$MONGO_URI \
  --require-approval=never

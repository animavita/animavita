yarn workspace @animavita/graphql prepare:staging

yarn workspace @animavita/aws deploy AnimavitaStagingGraphQLStack \
  -c mode=staging \
  -c hostedZoneId=Z27QC8Y7L2GD6O \
  -c certificateArn=arn:aws:acm:us-east-1:738983105661:certificate/35b7c0e1-c1b4-46e7-936e-26db03a130fe \
  -c JWT_KEY=$JWT_KEY \
  -c MONGO_URI=$MONGO_URI \
  --require-approval=never

#yarn workspace @animavita/aws deploy AnimavitaStagingDomainStack \
#  -c mode=staging \
#  -c hostedZoneId=Z27QC8Y7L2GD6O \
#  -c certificateArn=arn:aws:acm:us-east-1:738983105661:certificate/35b7c0e1-c1b4-46e7-936e-26db03a130fe \
#  --require-approval=never
import * as CDK from '@aws-cdk/core';
import * as S3 from '@aws-cdk/aws-s3';
import * as S3Deployment from '@aws-cdk/aws-s3-deployment';

import {ModeStack} from '../helpers';

export class WebStack extends ModeStack {
  public readonly domainName = 'animavita.site';
  public readonly hostedZoneId: string = this.node.tryGetContext('hostedZoneId');
  public readonly graphqlWhitecard = this.mode === 'production' ? 'graphql' : `graphql-${this.mode}`;
  public readonly certificateArn: string = this.node.tryGetContext('certificateArn');

  constructor(app: CDK.App, id: string) {
    super(app, id);

    const bucket = new S3.Bucket(this, 'AnimavitaWebPublicBucket', {
      bucketName: `animavita-${this.mode}-public`,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    new S3Deployment.BucketDeployment(this, 'AnimavitaWebDeploy', {
      sources: [S3Deployment.Source.asset('../expo/web-build')],
      destinationBucket: bucket,
    });
  }
}

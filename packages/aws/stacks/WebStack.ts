import * as CDK from '@aws-cdk/core';
import * as S3 from '@aws-cdk/aws-s3';
import * as S3Deployment from '@aws-cdk/aws-s3-deployment';
import * as Cloudfront from '@aws-cdk/aws-cloudfront';
import * as Route53 from '@aws-cdk/aws-route53';
import * as Route53Targets from '@aws-cdk/aws-route53-targets';

import {ModeStack} from '../helpers';

export class WebStack extends ModeStack {
  public readonly domainName = 'animavita.site';
  public readonly hostedZoneId: string = this.node.tryGetContext('hostedZoneId');
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

    const viewerCertificate = Cloudfront.ViewerCertificate.fromAcmCertificate(
      {
        stack: this,
        node: this.node,
        certificateArn: this.certificateArn,
      },
      {
        aliases: [this.domainName, `www.${this.domainName}`],
        sslMethod: Cloudfront.SSLMethod.SNI,
      },
    );

    const cdn = new Cloudfront.CloudFrontWebDistribution(this, 'AnimavitaWebCDN', {
      httpVersion: Cloudfront.HttpVersion.HTTP1_1,
      priceClass: Cloudfront.PriceClass.PRICE_CLASS_100,
      viewerProtocolPolicy: Cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      defaultRootObject: 'index.html',
      viewerCertificate,
      originConfigs: [
        {
          customOriginSource: {
            domainName: bucket.bucketWebsiteDomainName,
            originProtocolPolicy: Cloudfront.OriginProtocolPolicy.MATCH_VIEWER,
          },
          behaviors: [
            {
              allowedMethods: Cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              compress: true,
              isDefaultBehavior: true,
              forwardedValues: {
                queryString: true,
                cookies: {forward: 'all'},
              },
            },
          ],
        },
      ],
    });

    const hostedZone = Route53.HostedZone.fromHostedZoneAttributes(this, 'AnimavitaHostedZone', {
      zoneName: this.domainName,
      hostedZoneId: this.hostedZoneId,
    });

    new Route53.ARecord(this, 'AnimavitaWebAlias', {
      zone: hostedZone,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(cdn)),
    });
    new Route53.ARecord(this, 'AnimavitaWebWWWAlias', {
      recordName: 'www',
      zone: hostedZone,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(cdn)),
    });
  }
}

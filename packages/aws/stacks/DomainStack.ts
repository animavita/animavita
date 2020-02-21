import * as CDK from '@aws-cdk/core';
import * as Route53 from '@aws-cdk/aws-route53';
import * as Route53Targets from '@aws-cdk/aws-route53-targets';
import * as ApiGateway from '@aws-cdk/aws-apigateway';

import {getParam} from '../helpers';

export class DomainStack extends CDK.Stack {
  public readonly mode: string = this.node.tryGetContext('mode') || 'development';
  public readonly Mode: string =
    this.node.tryGetContext('mode').replace(/^\w/, (c: string) => c.toUpperCase()) || 'Development';

  public readonly domainName = 'animavita.site';
  public readonly graphqlWhitecard = this.mode === 'production' ? 'graphql' : `graphql-${this.mode}`;
  public readonly hostedZoneId: string = this.node.tryGetContext('hostedZoneId');
  public readonly certificateArn: string = this.node.tryGetContext('certificateArn');

  constructor(scope: CDK.Construct, id: string) {
    super(scope, id);

    const hostedZone = Route53.HostedZone.fromHostedZoneAttributes(this, 'AnimavitaHostedZone', {
      zoneName: this.domainName,
      hostedZoneId: this.hostedZoneId,
    });

    const graphqlDomainName = new ApiGateway.DomainName(this, 'AnimavitaGraphQLDomainName', {
      domainName: `${this.graphqlWhitecard}.${this.domainName}:prod`,
      endpointType: ApiGateway.EndpointType.REGIONAL,
      certificate: {
        certificateArn: this.certificateArn,
        node: this.node,
        stack: this,
      },
    });

    const restApiId = getParam(this, `/Animavita${this.Mode}GraphQLStack/APIGateway/ApiId`);

    graphqlDomainName.addBasePathMapping({
      stack: this,
      node: this.node,
      restApiId,
    });

    new Route53.ARecord(this, 'AnimavitaGraphQLAlias', {
      recordName: this.graphqlWhitecard,
      zone: hostedZone,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.ApiGatewayDomain(graphqlDomainName)),
    });
  }
}

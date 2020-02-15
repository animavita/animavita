import * as CDK from '@aws-cdk/core';
import * as S3 from '@aws-cdk/aws-s3';
import * as Lambda from '@aws-cdk/aws-lambda';
import * as ApiGateway from '@aws-cdk/aws-apigateway';
import * as SQS from '@aws-cdk/aws-sqs';
import {SqsEventSource} from '@aws-cdk/aws-lambda-event-sources';

export class GraphQLStack extends CDK.Stack {
  public readonly mode: string = this.node.tryGetContext('mode') || 'development';

  constructor(app: CDK.App, id: string) {
    super(app, id);

    const bucket = new S3.Bucket(this, 'AnimavitaGraphQLFileBucket', {
      bucketName: `animavita-${this.mode}-files`,
    });

    const standardQueue = new SQS.Queue(this, 'AnimavitaStandardQueue', {
      queueName: `animavita-${this.mode}-standard-queue`,
    });

    const graphql = new Lambda.Function(this, 'AnimavitaGraphQLFunction', {
      code: Lambda.Code.fromAsset('../graphql/build', {
        exclude: ['worker.*'],
      }),
      handler: 'index.handler',
      runtime: Lambda.Runtime.NODEJS_12_X,
      timeout: CDK.Duration.seconds(15),
      description: 'Lambda function that runs GraphQL koa server',
      functionName: `animavita-${this.mode}-graphql-function`,
      environment: {
        AWS_S3_BUCKET_NAME: bucket.bucketName,
        AWS_STANDARD_QUEUE_URL: standardQueue.queueUrl,
      },
    });

    bucket.grantPut(graphql);
    standardQueue.grantSendMessages(graphql);

    const api = new ApiGateway.RestApi(this, 'AnimavitaGraphQLApi', {
      restApiName: `animavita-${this.mode}-graphql-api`,
    });
    const integration = new ApiGateway.LambdaIntegration(graphql);

    const root = api.root;
    const path = api.root.addResource('{proxy+}');

    root.addMethod('ANY', integration);
    path.addMethod('ANY', integration);

    const worker = new Lambda.Function(this, 'AnimavitaWorkerFunction', {
      code: Lambda.Code.fromAsset('../graphql/build', {
        exclude: ['index.*'],
      }),
      handler: 'worker.handler',
      runtime: Lambda.Runtime.NODEJS_12_X,
      timeout: CDK.Duration.seconds(15),
      description: 'Lambda function that runs worker',
      functionName: `animavita-${this.mode}-worker-function`,
      environment: {
        AWS_S3_BUCKET_NAME: bucket.bucketName,
        AWS_STANDARD_QUEUE_URL: standardQueue.queueUrl,
      },
    });

    worker.addEventSource(new SqsEventSource(standardQueue));

    standardQueue.grantConsumeMessages(worker);
    bucket.grantRead(worker);
  }
}

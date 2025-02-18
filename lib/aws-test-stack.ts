import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSource from 'aws-cdk-lib/aws-lambda-event-sources';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class AwsTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create our Queue
    const queue = new sqs.Queue(this, 'AwsTestQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    // Create Lambda Function
    const sqsLambda = new lambda.Function(this, 'SQSLambda', {
      handler: "lambda_handler.handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda')
    })

    // Create Event Source
    const sqsEventSource = new lambdaEventSource.SqsEventSource(queue)

    // Add SQS event source to Lambda
    sqsLambda.addEventSource(sqsEventSource)
  }
}

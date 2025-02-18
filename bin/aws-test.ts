#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsTestStack } from '../lib/aws-test-stack';

const app = new cdk.App();
new AwsTestStack(app, 'AwsTestStack', {
    env: {
        account: '176125625438',
        region: 'ap-southeast-1'
    }
});
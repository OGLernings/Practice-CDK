#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PracticeCdkStack } from '../lib/practice-cdk-stack';
import { lambdaStack } from '../lib/lambda-stack';
import {LexbotStack} from '../lib/lex-stack'

const app = new cdk.App();
new PracticeCdkStack(app, 'PracticeCdkStack', {
  env: { account: "862165548342", region: "us-east-1" },
});
new lambdaStack(app, 'lambdaStack', {
  env: { account: "862165548342", region: "us-east-1" },
});
new LexbotStack(app, 'lexStack', {
  env: { account: "862165548342", region: "us-east-1" },
});
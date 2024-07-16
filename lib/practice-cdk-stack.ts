import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";

export class PracticeCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  const cdkgit = new CodePipeline(this, "logicalcdkgit", {
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("OGLernings/Practice-CDK", "main"),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
      pipelineName: "Malleswar-Pipeline",
    });
  }
}

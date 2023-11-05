import path from "path";
import * as cdk from "aws-cdk-lib";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import { AmplifyDependentResourcesAttributes } from "../../types/amplify-dependent-resources-ref";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

export class cdkStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, "env", {
      type: "String",
      description: "Current Amplify CLI env name",
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */
    const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(
      this,
      amplifyResourceProps.category,
      amplifyResourceProps.resourceName,
      [
        {
          category: "function", // api, auth, storage, function, etc.
          resourceName: "userHandler", // find the resource at "amplify/backend/<category>/<resourceName>"
        } /* add more dependencies as needed */,
      ]
    );

    // Example 1: Set up an SQS queue with an SNS topic

    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const sqsQueueResourceNamePrefix = `${amplifyProjectInfo.projectName}-userQueue-${cdk.Fn.ref("env")}`;
    const queue = new sqs.Queue(this, "sqs-queue", {
      queueName: `${sqsQueueResourceNamePrefix}`,
    });
    // 👇create sns topic

    const snsTopicResourceNamePrefix = `sns-topic-${amplifyProjectInfo.projectName}-User-${cdk.Fn.ref("env")}`;
    const topic = new sns.Topic(this, "sns-topic", {
      topicName: `${snsTopicResourceNamePrefix}-${cdk.Fn.ref("env")}`,
    });
    // 👇 subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));
    new cdk.CfnOutput(this, "snsTopicArn", {
      value: topic.topicArn,
      description: "The arn of the SNS topic",
    });

    const lambdaRole = iam.Role.fromRoleArn(
      this,
      "userHandlerLambdaRole",
      `${cdk.Fn.ref(dependencies.function.userHandler.LambdaExecutionRoleArn)}`
    );

    lambdaRole.attachInlinePolicy(
      new iam.Policy(this, "receive-events", {
        statements: [
          new iam.PolicyStatement({
            actions: ["sqs:ReceiveMessage"],
            resources: [queue.queueArn],
          }),
        ],
      })
    );

    //create a CDK instance of our Amplify Lambda
    const userHandler = lambda.Function.fromFunctionAttributes(this, "userHandler", {
      functionArn: cdk.Fn.ref(dependencies.function.userHandler.Arn),
      role: lambdaRole,
    });

    // Add the SQS queue as an event source for the Lambda function
    userHandler.addEventSource(new SqsEventSource(queue));
  }
}

# Gas Control Project - Lotus Notes Replacement - Log Book Section

## Goal

To be completed

## High Level Design

To be completed

## Infrastructure as code

One of the main goals of the project is to create reusable scripts that can run the project up on any Amazon account. 

### IAC - Possible Technical Debt and notes
#### `amplify configure` details - manual entries
Currently have no method for automating this. 

AWS Configure opens the AWS console login page. Log in with your account and follow the steps. The steps will create an IAM account, which will have permissions to create AWS Cloud resources from the command line. You will be asked to enter an access key ID and a Secret Access key, which belong to the IAM user you create in the configure step. You only do this once. Can be done anywhere and is global.

1. Region:  `eu-west-1`
2. User:    `amplify-gcp`
    - Access:   `programmatic access`
    - Role:     `Administrator access permissions`
    - Tags:     `project: gas-control-project`
    - Action:   `create user`
3. Access Key:  Created when creating the amplify-gcp user above and stored in ~/.aws.
4. Secret Key:  Created when creating the amplify-gcp user above and stored in ~/.aws.

### `amplify init` details - manual entries
Currently have no method for automating this.

Initialize AWS Amplify in the new directory. For this project we complete these steps at the gcp/gc-log-book directory.

1. Project name:        `gclogbook`
2. Environment:         `dev`
3. Editor:              `Visual Studio Code`
4. Type of App:         `Javascript` then `react`
5. Source Directory:    `src`
6. Build Command:       `npm.cmd run-script build`
7. Start Command:       `npm.cmd run-script start`
8. Use AWS Profile:     `Y` then `amplify-gcp-profile`

## Notes in General
### AWS Amplify features

AWS Amplify is a framework that consists of three parts to help you connect your web or mobile app to AWS Cloud resources.  These include:

AWS Command line interface (CLI): Allows you to create AWS resources from the command line and set up your project to make use of them
Libraries: JS, Android and iOS libraries to help you easily access these cloud resources from your application
UI components: UI components for common use cases related to the AWS resources you can create with the CLI.
The UI components part is optional, however to get the most out of Amplify you will need to use the CLI’s and libraries. With Amplify you can generate and use AWS resources by simply answering some questions in the CLI and using the libraries provided by Amplify. There are Amplify libraries for React and React-Native, Angular and Ionic and Vue.js. Amplify consists of categories of services which can be configured:

* Analytics: Collect analytics for your app. Makes use of Amazon Pinpoint and Amazon Kinesis.
* API: HTTP REST or GraphQL API. Uses API Gateway(REST) or AWS AppSync (GraphQL) 
* Authentication: Create user authentication. Makes use of Amazon Cognito.
* Function: Create serverless functions. Makes use of AWS Lambda.
* Hosting: Hosts your web app in the Cloud. Makes use of S3 and Amazon CloudFront.
* Interactions: Add Chatbot functionality to your app. Makes use of Amazon Lex.
* PubSub: Create a publish-subscribe message-oriented middleware. Makes use of AWS IoT and MQTT over WebSockets.
* Push Notifications: Set up push notification functionality for mobile apps. (only available for React Native)
* Storage: Add Content or a NoSQL database. Makes use of S3 and DynamoDB
* XR: Add Augmented reality to your app. Makes use of Amazon Sumerian.

### Setting up
To add AWS Amplify to the project the following was performed.

1. Install the latest Node.js or update your current version to the latest LTS which at the time of writing was 12.18.3. It is essential that you confirm the version is the latest for example you will fail to create Authentication resources in Lambda using nodejs version 10 (2018 release date).
2. Using NPM (Node Package Manager) install the following packages or update them. It is essential that you confirm the version is the latest. Also be-aware that AWS has changed the way it references the packages. We have legacy and latest. Legacy packages look like this `aws-amplify-react` and have valid NPM package locations such as https://www.npmjs.com/package/aws-amplify-react. However AWS have released new pacakges with additional functionality. If you are looking at guides be sure to notice the difference as backwards compatibility will ensure they still work, but you will fail later on down the line when this project uses the latest libraries. New packages will look like this `@aws-amplify/<<packagename>>` see https://www.npmjs.com/package/aws-amplify. List version installed using `npm list <<packagename>>` or `npm list -g <<packagename>>` for globally installed packages.
    - `npm install -g @aws-amplify/cli` - note the -g for global. This is the Command Line Interface we will build our infrastructure with.
    - `npm install aws-amplify @aws-amplify/ui-react` - these are the Javascript libraries we will use to quickly enhance our project. Such as using Higher Order Components to wrap our app and provide quick and simple Authentication https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#option-1-use-pre-built-ui-components.
3. `amplify configure` - Amplify cli command, see above for more details
4. `amplify init` - Amplify cli command, see above for more details

Amplify init adds these files (paths are relative to root directory of project):
* amplify/.config/local-aws-info.json (gitignored): Tells Amplify which AWS profile to use.
* amplify/.config/local-env-info.json (gitignored): Contains user and system preferences, such as default code editor
* amplify/.config/project-config.json: Project specific information, such as where the src directory is located.
* amplify/#current-cloud-backend/amplify-meta.json: Contains metadata of all resources pushed to the Cloud via Amplify. More on this later.
* amplify/backend/amplify-meta.json: The same as the previous file, except this reflects the local state of your amplify resources. More on this later.
* amplify/backend/backend-config.json: Contains a description of all the resources you have created with Amplify. It will be an empty object when starting off.
* amplify/team-provider-info.json: This file has information about the environments tied to this project and should be checked into git so that other team members can also make use of these configured environments. More on this later.
* src/aws-exports: A file used to configure the Amplify frontend libraries, which we will be using later on in this article.

You will now have your local env in a position to provision AWS resources. Use `amplify status` to see what you have (should be a blank grid at this point)

#### Adding Auth

1. `amplify add auth`
    - Default config
    - Email as Username
    - No advanced settings

#### Pushing resources up to AWS

1. `amplify push` will push resources configs up to AWS and build them ( `aws publish` will push configuration up and build, whilst also deploying your app to S3).
2. Here be dragons, be very careful and take this statement with a pinch of salt. If anything went wrong, most changes should be rolled back. You can go to the CloudFormation stack and delete it. All that remains should be the amplify-gcp user you created earlier. Then you need to do a local clean up on your local env.

#### Adding Hosting

1. `amplify add hosting`
    - Manual deployment (we will figure out how to change this to a continual deployment option in the future. Recorded as technical debt)
2. `amplify publish` this will push the config up to AWS, build and then deploy to an S3 bucket. When it returns on the command line you will have a url to browse to. In our case it is https://dev.d6gezm7tn0znp.amplifyapp.com.



### Cleaning a local environment

1. `amplify configure` creates the following local files:
    - `~/.aws/config` and `~/.aws/credentials` where `~/` in Windows === `%USERPROFILE%`
2. Other amplify commands create the following local files:
    - A directory called `gcp/gc-log-book/amplify`
    - A file called `gcp/gc-log-book/src/aws-exports.js`

I just deleted these files as it was early days and I could easily blow things away. Your milage may vary and you may require a more nuanced approach such as editing the files themselves.

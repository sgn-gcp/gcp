import React from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import AwsArchitecture from '../resources/images/aws-amplify-setup.png';

function Home() {
  const imageProps = {
    src: AwsArchitecture,
    imageFit: ImageFit.centerContain,
    width: 450,
    height: 214,
    alt: 'Diagram of AWS Amplify Architecture',
  };

  return (
    <div>
      <h1>SGN Gas Replacement POC</h1>
      <div>
        <p>
          This is the dev environment of the SGN project to replace Lotus Notes.
          It is currently a POC in order to show how quickly the CoEs can create
          usable apps in-house.
        </p>
        <Image {...imageProps} src={AwsArchitecture} />
        <p>
          The Phone Book section of the App is React based with an Amplify
          backend. It is secured using Amazon Cognito (as part of the Amplify
          offering) with plans to introduce Federation out to Okta to allow
          Single Sign On within the SGN estate.
        </p>
        <p>
          Using a secured AppSync GraphQL API (again managed by Amplify) the
          PhoneBook connects to a DynamoDB instance. DynamoDB is a flat database
          ported from MongoDB. We have chosen this for simplicties sake, however
          more complicated databases can be supported in the future.
        </p>
        <p>
          The Log Book section is still a work in progress and just shows for
          now the initial work done to show how we would demo routing within the
          app.
        </p>
        <p>
          You can find the source code here{' '}
          <a
            href='https://github.com/sgn-gcp/gcp'
            rel='noopener noreferrer'
            target='_blank'
          >
            SGN - Gac Replacement POC
          </a>
        </p>
      </div>
    </div>
  );
}

export default Home;

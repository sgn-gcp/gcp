import React from 'react';
import './App.css';
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import { AmplifySignOut, withAuthenticator  } from '@aws-amplify/ui-react'

import Header from './Components/Header'
import Main from './Components/Main'

Amplify.configure(awsconfig)

function App() {
  return (
    <div>
      <AmplifySignOut />
      <Header />
      <Main />
    </div>
  );
}

export default withAuthenticator(App);

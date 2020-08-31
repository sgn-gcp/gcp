import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import './AppStyles.css';
import Header from './Components/Header';
import Main from './Components/Main';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className='wrapper'>
      <AmplifySignOut />
      <Header />
      <Main />
    </div>
  );
}

export default withAuthenticator(App);

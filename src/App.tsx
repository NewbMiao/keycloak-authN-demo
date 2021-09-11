import React from 'react';
import { Switch, Route } from 'react-router-dom';
import KeycloakProvider from './KeycloakProvider';
import './styles.css';
import UserInfo from './UserInfo';
import Verify from './Verify';



const App: React.FC = () => (
  <div className="App">
    <KeycloakProvider>
      <Switch>
        <Route path="/verify">
          <Verify />
        </Route>

        <Route path="/">
          <div>
            <h1>Hello, you just authorised!</h1>
            <UserInfo />
          </div>
        </Route>
      </Switch>
    </KeycloakProvider>
  </div>
);

export default App;

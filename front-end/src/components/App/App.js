/*
 * Main app component
 */

/* Module imports */
import React from 'react';
import { UserProvider } from './UserProvider';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Home from '../Home/Home';
import NavBar from '../NavBar/NavBar';

/* Styles imports */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Component imports */

/* App component */

export default function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/register'>
              <SignUp />
            </Route>
            <Route path='/'>
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

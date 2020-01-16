/*
 * Main app component
 */

/* Module imports */
import React, { Component } from 'react';
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
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

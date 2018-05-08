import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';

import Auth from './containers/auth/auth';
import Dashboard from './containers/dashboard/dashboard';
import Aux from './hoc/Auxulary';
import Signup from './containers/signup/signup'

class App extends Component {

state = {
  session:false
}

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Aux session={this.state.session}>
            <Route path='/' exact component={Auth} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/register' component={Signup} />
          </Aux>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

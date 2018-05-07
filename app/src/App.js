import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

import Auth from './containers/auth/auth';
import Dashboard from './containers/dashboard/dashboard';
import Aux from './hoc/Auxulary';

class App extends Component {

state = {
  session:false
}

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Aux session={this.state.session}>
            <Route path='/' exact component={Dashboard} />
            <Route path='/login' component={Auth} />
          </Aux>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';

import Aux from './hoc/Auxulary';
import Signup from './containers/Signup/Signup';
import Auth from './containers/auth/auth';
import Dashboard from './containers/dashboard/dashboard';
import Billing from './containers/Billing/Billing';
import BillHistory from './containers/Billing/BillHistory';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Aux>
              { this.isLoggedIn()  }                    
              {/* <Route path='/dashboard' component={ Dashboard } /> */}
              <Route path='/' exact component={Auth} />
              <Route path='/register' component={Signup} />              
              <Route path='/dashboard/billing' component={Billing} />          
              <Route path='/dashboard/billinghistory' component={BillHistory} />          
          </Aux>
        </div>
      </BrowserRouter>
    );
  }

  isLoggedIn = () => {
      return !this.props.auth ? <Redirect to="/" /> : <Route path='/dashboard' component={ Dashboard } /> 
  }

}

const mapStateToProps = (state) =>{
  return {
      auth:state.auth
  }
}

export default connect(mapStateToProps) (App);

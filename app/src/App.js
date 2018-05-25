import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
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
      let Routes = (
        <Switch>
            <Route path='/' exact component={Auth} />
            <Route path='/register' component={Signup} />
            <Redirect to="/" />
        </Switch>
       )
      if(this.props.auth){
        Routes = (
          <Aux>
          <Route path='/dashboard' component={ Dashboard } />
        <Switch>
          <Route path='/dashboard/billing' component={Billing} />          
          <Route path='/dashboard/billinghistory' component={BillHistory} /> 
        </Switch> </Aux>);
       }
    return (
      <BrowserRouter>
        <div className="container-fluid">
            {Routes}
            <br/>
            <p className="text-center">©2018 HH</p>
        </div>
      </BrowserRouter>
    );
  }

  isLoggedIn = () => {
     // return !this.props.auth ? <Redirect to="/" /> : <Route path='/dashboard' component={ Dashboard } /> 
  }

}

const mapStateToProps = (state) =>{
  return {
      auth:state.auth
  }
}

export default connect(mapStateToProps) (App);

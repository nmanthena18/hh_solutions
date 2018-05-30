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
import * as actionTypes from './Store/actions';
import Axios from './Axios';

class App extends Component {
  render() {
    if(!this.props.auth){
      let d = new Date();
      Axios.get('/api?time='+d.getTime()).then(res =>{
        this.props.login(res.data);
      });
    }
      let Routes ="";
        if(this.props.auth && this.props.auth.code ){
        Routes = (
        <Switch>
            <Route path='/' exact component={Auth} />
            <Route path={`${process.env.PUBLIC_URL}/register`} component={Signup} />
            <Redirect to="/" />
        </Switch>)}
        
       
      if(this.props.auth && this.props.auth.user_id){
        Routes = (
          <Aux>
          <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={ Dashboard } />
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/dashboard/billing`} component={Billing} />          
          <Route path={`${process.env.PUBLIC_URL}/dashboard/billinghistory`} component={BillHistory} /> 
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
const mapDispatchToProps = (dispatch) => {
  return {
      login: (auth) => dispatch({type: actionTypes.LOGIN_AUTHENDICATION, auth:auth}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (App);

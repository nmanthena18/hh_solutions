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

let timeoutID;
class App extends Component {
  render() {
    if(!this.props.auth){
      let d = new Date();
      Axios.get('/api?time='+d.getTime()).then(res =>{
        this.props.login(res.data);
      });
    }
      let Routes ="";
        if(this.props.auth &&  this.props.auth.code){
        Routes = (
        <Switch>
          <Route path='/' exact component={Auth} />
            <Route path={`${process.env.PUBLIC_URL}/register`} component={Signup} />
            <Redirect to="/" />
        </Switch>)}        
       
      if(this.props.auth && !this.props.auth.code){
        //Checkin user active
        window.addEventListener("mousemove", this.resetTimer, false);
        window.addEventListener("mousedown", this.resetTimer, false);
        window.addEventListener("keypress", this.resetTimer, false);
        window.addEventListener("DOMMouseScroll", this.resetTimer, false);
        window.addEventListener("mousewheel", this.resetTimer, false);
        window.addEventListener("touchmove", this.resetTimer, false);
        window.addEventListener("MSPointerMove", this.resetTimer, false);
        this.startTimer();
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
  componentDidMount(){
    // if user logout check the status
    Axios.interceptors.response.use(res =>{
      if(res.data.expired){
        this.props.logout(res.data)
      }
      return res
    });
  }

  // Auto session expried   
  startTimer  = () => {
    timeoutID = window.setTimeout(this.goInactive, 1000*50);
  }
   
  resetTimer = (e) =>{
      window.clearTimeout(timeoutID);
      this.startTimer();
      console.log(timeoutID)
  }
 
  goInactive = () => {
      Axios.get('/api/logout', { headers: { 'x-access-token': localStorage.getItem("token") }}).then(res =>{
          this.props.logout({code: 401, message: "Not authorized"});
          this.props.history.push('/');
          localStorage.removeItem('token');
          this.props.logout({expired:true, code:401,message: "Not authorized"});
          window.clearTimeout(timeoutID);
      }).catch(err =>{
          console.log(err)
      });
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
      logout: (auth) => { dispatch({type: actionTypes.LOGOUT_AUTHENDICATION, auth:auth}) }
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (App);

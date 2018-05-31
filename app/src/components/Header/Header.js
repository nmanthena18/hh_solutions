import React, {Component} from 'react';
import {connect } from 'react-redux';
import {NavLink} from 'react-router-dom';

import Button from '../UI/Buttons/Buttons';
import * as actionTypes from '../../Store/actions';
import Axios from '../../Axios';

class Header extends Component {
    render(){
        return(
            <div className="row" style={{marginLeft:'-15px', marginRight:"-15px"}}>
                <div className="col no-gutters">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand mr-auto p-2 bd-highlight"><img src="../logo.png" width="32px" alt="Logo" /> HH</span>
                    <div className="bd-highlight">
                        
                        <ul className="topNav">
                        { this.props.auth ? 
                        <li className="item">
                            Welcome <span>{ this.props.auth.name }</span>
                        </li> : null
                        }
                            <li className="item">
                                <NavLink to='/dashboard'>Dashboard</NavLink>
                            </li>
                            <li>
                                <Button classes="btn btn-primary" clicked={this.Logout}>Logout</Button>
                            </li>
                        </ul>
                        
                    </div>
                    {this.props.children}
                </nav> <br/>
                </div>
            </div>
        )
    }

    Logout = () =>{
        Axios.get('/api/logout', { headers: { 'x-access-token': localStorage.getItem("token") }}).then(res =>{
            this.props.logout({code: 401, message: "Not authorized"});
            this.props.history.push('/');
            localStorage.removeItem('token');
        }).catch(err =>{
            console.log(err)
        });
    }
}

    

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (auth) => { console.log(auth); dispatch({type: actionTypes.LOGOUT_AUTHENDICATION, auth:auth}) }
    };
}
 
export default connect(mapStateToProps, mapDispatchToProps) (Header); 
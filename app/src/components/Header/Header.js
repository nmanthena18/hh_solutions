import React from 'react';
import {connect } from 'react-redux';
import {NavLink} from 'react-router-dom';

import Button from '../UI/Buttons/Buttons';
import * as actionTypes from '../../Store/actions';
import Axios from '../../Axios';

const Header = (props) =>{
    const Logout = () =>{
        Axios.get('/api/logout').then(res =>{
            props.logout(null);
        }).catch(err =>{
            console.log(err)
        });
    }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mr-auto p-2 bd-highlight" href="#"> Welcome to Hanuman Hardwares</span>
                <div className="bd-highlight">
                    <span>{props.auth}</span>
                    <ul className="topNav">
                        <li className="item">
                            <NavLink to='/dashboard'>Dashboard</NavLink>
                        </li>
                        <li>
                            <Button classes="btn btn-primary" clicked={Logout}>Logout</Button>
                        </li>
                    </ul>
                    
                </div>
                {props.children}
            </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (s) => { dispatch({type: actionTypes.LOGOUT_AUTHENDICATION, auth:s})}
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Header);
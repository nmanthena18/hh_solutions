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
        <div className="row" style={{marginLeft:'-15px', marginRight:"-15px"}}>
            <div className="col no-gutters">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mr-auto p-2 bd-highlight" href="#"> Welcome to HH</span>
                <div className="bd-highlight">
                    
                    <ul className="topNav">
                    { props.auth ? 
                    <li className="item">
                        Welcome <span>{ props.auth.name }</span>
                    </li> : null
                    }
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
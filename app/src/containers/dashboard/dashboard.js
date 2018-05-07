import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
    render(){
        return(
            <div>
            <Link to="/login"> Login </Link>
            <Link to="/signup"> Sign Up </Link>
            <div>Dashboard</div>
            </div>
        )
    }
}

export default Dashboard;
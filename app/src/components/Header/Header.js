import React from 'react';

const Header = (props) =>{
    return(
        <div>
            <ul class="nav">
                <li class="nav-item">
                    <Link to="/login" activeClassName="active"> Login </Link>
                </li>
                <li class="nav-item">
                    <Link to="/signup" activeClassName="active"> Sign Up </Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;
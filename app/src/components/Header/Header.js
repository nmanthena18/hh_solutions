import React from 'react';
import Button from '../UI/Buttons/Buttons';

const Header = (props) =>{
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mr-auto p-2 bd-highlight" href="#"> Welcome to Hanuman Hardwares</span>
                <div className="bd-highlight">
                    <Button classes="btn btn-primary" clicked={props.logoutHandler}>Logout</Button>
                </div>
                {props.children}
            </nav>
        </div>
    )
}

export default Header;
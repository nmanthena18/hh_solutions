import React from 'react';

const Alert = (props) =>{
    let alert = <div></div>;
    if(props.show){
       alert=<div className={"alert " +props.classes}  role="alert">
                {props.children}
            </div>
    }
    return (
        alert         
    )
}

export default Alert;

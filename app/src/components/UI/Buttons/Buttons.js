import React from 'react';

const Button = (props) =>{
    return (
            <button
                onClick={props.clicked}
                disabled={props.disabled}
                type={props.btnType || 'button'}
                className={props.classes}>
                {props.children}
            </button>
    )
}

export default Button;
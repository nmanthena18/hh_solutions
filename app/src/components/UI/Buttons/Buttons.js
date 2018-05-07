import React from 'react';

const Button = (props) =>{
    return (
        <div className="form-group">
            <button
                onClick={props.clicked}
                disabled={props.disabled}
                type={props.btnType || 'button'}
                className={props.classes}>
                {props.children}
            </button>
        </div>
    )
}

export default Button;
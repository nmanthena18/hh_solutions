import React from 'react';

const Input = (props) =>{
    return (
        <div className="form-group">
        <input 
            onChange={props.change}
            disabled={props.disabled}
            type={props.inpType || 'text'}
            className={props.classes} />
        </div>
    )
}

export default Input;
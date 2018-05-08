import React from 'react';

const Input = (props) =>{
    return (
        <div className="form-group">
        <input 
            autoComplete="nope"
            onChange={props.change}
            disabled={props.disabled}
            type={props.inpType || 'text'}
            className={props.classes} 
            placeholder={props.placeholder}
            name={props.name}/>
        </div>
    )
}

export default Input;
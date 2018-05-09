import React from 'react';

const Input = (props) =>{
    let ElementClasses = [props.classes]
    if(!props.isInvalid && props.touched){
        ElementClasses.push('invalid-control')
    }
    return (
        <div className="form-group">
        <input 
            autoComplete="nope"
            onChange={props.change}
            disabled={props.disabled}
            type={props.inpType || 'text'}
            className={ElementClasses.join(' ')} 
            placeholder={props.placeholder}
            name={props.name}/>
        </div>
    )
}

export default Input;
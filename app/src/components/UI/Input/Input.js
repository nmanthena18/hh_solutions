import React from 'react';

const Input = (props) =>{
    let ElementClasses = [props.classes]
    if(!props.isInvalid && props.touched){
        ElementClasses.push('invalid-control')
    }
    let Element = null;
    switch (props.inpType) {
        case 'textarea' : 
        Element = <textarea
            onChange={props.change}
            disabled={props.disabled}
            className={ElementClasses.join(' ')} 
            placeholder={props.placeholder}
            value={props.children}
            name={props.name}></textarea>
            break;
        case 'select' :
            Element = <select
            onChange={props.change}
            disabled={props.disabled}
            className={ElementClasses.join(' ')} 
            placeholder={props.placeholder}
            name={props.name}>
            {props.children} </select>
            break;
        default : 
            Element =<input 
            autoComplete="nope"
            onChange={props.change}
            disabled={props.disabled}
            type={props.inpType || 'text'}
            className={ElementClasses.join(' ')} 
            placeholder={props.placeholder}
            name={props.name}/>
            {props.children}            
    }
    return (
        <div className={props.inputGroupSymbol ? "input-group" :"form-group" }>
            { Element }
            {props.inputGroupSymbol ? <div className="input-group-prepend"> <span className="input-group-text">{props.inputGroupSymbol}</span></div> : null}   
        </div>
    )
}

export default Input;
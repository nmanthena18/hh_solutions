import React from 'react';

const Columns = (props) =>{
    let col = props.action ? <div className={'react-col col text-center'}><span onClick={props.edit}><i className="far fa-edit"></i></span></div> : <div className={'react-col col'} key={props.id} >{props.children}</div>
    return (col);
}

export default Columns;
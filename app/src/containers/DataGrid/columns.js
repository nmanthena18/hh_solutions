import React from 'react';

const Columns = (props) =>{
    return (<div className={props.classes + ' col'} key={props.id} >{props.name}</div>);
}

export default Columns;
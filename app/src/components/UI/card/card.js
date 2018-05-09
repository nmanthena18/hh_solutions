import React from 'react';
import Aux from '../../../hoc/Auxulary';

const card = (props) =>{
    return(
        <Aux>
            <div className="card">
                <h5 className="card-header">{props.title}</h5>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </Aux>
    )
}

export default card;

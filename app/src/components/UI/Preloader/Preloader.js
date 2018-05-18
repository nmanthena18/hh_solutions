import React from 'react';
import Aux from '../../../hoc/Auxulary';
import './Preloader.css';

const Preloader = (props) =>{ 
    let Preloader = props.show ? <div className="Preloader"></div> :null
    return (
        <Aux>
            {Preloader}
       </Aux>
    )
}

export default Preloader;
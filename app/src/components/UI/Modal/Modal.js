import React, {Component} from 'react';
import Overlay from './Backdrop';
import Aux from '../../../hoc/Auxulary';

class Modal extends Component{
    render(){
        return(
            <Aux>
                <Overlay clicked={this.props.closeModal} show={this.props.show} />
                <div className={"modal-box "+this.props.classes}
                        style={{
                            transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity:this.props.show ? '1':'0'
                        }}
                    >
                    <div className="title">{this.props.title}</div>
                    <div className="body">
                        {this.props.children}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Modal;
import React, {Component} from 'react';

class Alert extends Component {
    state = {
        show:true
    }
    render(){
        let alert = <div></div>;
        if(this.props.show){
            let autoClose = this.props.autoclose;
           alert=<div className={"alert " +this.props.classes}  role="alert"  autoclose={this.props.autoclose ?  this.alertAutoClose(autoClose) :null }>
                    {this.props.children}
                </div>
        }
        return (
            <div>
                {this.state.show ? alert : null}
            </div>
                     
        )
    }

    alertAutoClose = (time) =>{
        console.log(11)
        setTimeout( () => {
            this.setState({
                show:false
            })
        }, time)
    }
}

export default Alert;

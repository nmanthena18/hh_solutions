import React, {Component} from 'react';

class Alert extends Component {
    closeAlert = () =>{
        console.log(this.props)
    }
    
    render(){
        let alert = <div></div>;
        if(this.props.show){
            let autoClose = this.props.autoclose;
           alert=<div className={"alert " +this.props.classes}  role="alert"  autoclose={this.props.autoclose ?  this.alertAutoClose(autoClose) :null }>
                    {this.props.children}
                    <button className="close" onClick={this.closeAlert}><span aria-hidden="true">×</span></button> 
                </div>
        }
        return (
            <div>
                {this.props.show ? alert : null}
            </div>
                     
        )
        
    }
    
}

export default Alert;

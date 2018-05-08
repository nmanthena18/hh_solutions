import React, {Component} from 'react';

import Aux from '../../hoc/Auxulary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import Axios from '../../Axios';
import Alert from '../../components/UI/Alert/Alert';

class Signup extends Component {

    state ={
       form:{ user_id:null,
        name:null,
        email:null,
        password:null
       }
    }

    signUp = () =>{
        Axios.post('/api/signup', this.state.form).then( (data)=>{
            this.setState({
                successuser:true,
                userMsg:"New user created successfuly .!",
                alertClass:"alert-success"
            });

            console.log(data)
        }).catch((err)=>{
            this.setState({
                successuser:true,
                userMsg:err.response.data.message,
                alertClass:"alert-danger"
            })
        })
    }

    changeHandler = (e) => {
        let value = e.target.value;
        let form = "form";
        let obj = {...this.state.form}
        obj[e.target.name]=value
       this.setState({
            form:obj
        });        
    }

    render(){
        return(
            <Aux><form>

                <div className="row">
                    <div className="col-md-6 offset-md-3 m-t-100">
                        <h2 className="text-center">Welcome to Bill desk solution</h2>
                        <div className="card border-secondary" >
                        <div className="card-header">Register Your self</div>
                        <div className="card-body">
                            <Input classes="form-control" change={(e)=>this.changeHandler(e)} name="user_id" placeholder="Enter your Id"/>
                            <Input classes="form-control" change={this.changeHandler} name="name" placeholder="Enter your Name"/>
                            <Input classes="form-control" change={this.changeHandler} inpType="email" name="email" placeholder="Enter your email"/>
                            <Input classes="form-control" change={this.changeHandler} inpType="password" name="password" placeholder="Enter your password"/>
                            <Button classes="btn btn-primary" clicked={this.signUp}>Sign Up</Button>
                            {}
                            <Alert classes={this.state.alertClass} show={this.state.successuser}>{this.state.userMsg}</Alert>
                        </div>
                        </div>
                    </div>
                </div>  </form>              
            </Aux>
        )
    }

}

export default Signup;


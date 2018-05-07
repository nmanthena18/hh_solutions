import React, {Component} from 'react';

import Aux from '../../hoc/Auxulary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import Axios from '../../Axios';
class Signup extends Component {

    state ={
       form:{ user_id:null,
        name:null,
        email:null,
        password:null
       }
    }

    Signup = () =>{
        Axios.post('/api/signup', this.state).then( (data)=>{
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    changeHandler = (e) => {
        let value = e.target.value
       this.setState({
            form:{
            [e.target.name]:value
            }
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
                            <Input classes="form-control" change={this.changeHandler} inpType="email" name="name" placeholder="Enter your email"/>
                            <Input classes="form-control" change={this.changeHandler} inpType="password" placeholder="Enter your password"/>
                            <Button classes="btn btn-primary" clicked={this.Signup}>Sign Up</Button>
                        </div>
                        </div>
                    </div>
                </div>  </form>              
            </Aux>
        )
    }

}

export default Signup;


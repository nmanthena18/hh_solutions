import React, {Component} from 'react';

import Aux from '../../hoc/Auxulary';
import Button from '../../components/UI/Buttons/Buttons';
import Input from '../../components/UI/Input/Input';
import Axios from '../../Axios';

class Auth extends Component {
    state ={
        session:false,
    }
    Login = () =>{
        Axios.get('/api/test').then(res =>{

        }).catch(err =>{
            console.log(err)
        })
        this.setState({session:true});
    }
    render(){
        return(
            <Aux>
                <div className="row">
                    <div className="col-md-6 offset-md-3 m-t-100">
                        <h2 className="text-center">Welcome to Bill desk solution</h2>
                        <div className="card border-secondary" >
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <Input classes="form-control" placeholder="Enter your Id"/>
                            <Input classes="form-control" inpType="password" placeholder="Enter your password"/>
                            <Button classes="btn btn-primary" clicked={this.Login}>Login</Button>
                        </div>
                        </div>
                    </div>
                </div>                
            </Aux>
        );
    }
}

export default Auth;
import React, {Component} from 'react';

import Aux from '../../hoc/Auxulary';
import Button from '../../components/UI/Buttons/Buttons';
import Input from '../../components/UI/Input/Input';
import Axios from '../../Axios';

class Auth extends Component {
    state ={
        session:false,
        form:{
            user_id:null,
            password:null
        }
    }
    Login = () =>{
        Axios.post('/api/login', this.state.form).then(res =>{

        }).catch(err =>{
            console.log(err)
        })
        this.setState({session:true});
    }

    Test = () =>{
        Axios.get('/api/test').then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
        this.setState({session:true});
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
            <Aux>
                <div className="row">
                    <div className="col-md-6 offset-md-3 m-t-100">
                        <h2 className="text-center">Welcome to Bill desk solution</h2>
                        <div className="card border-secondary" >
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <Input classes="form-control" change={(e) => {this.changeHandler(e)}} placeholder="Enter your Id" name="user_id" value={this.state.form.user_id} />
                            <Input classes="form-control" change={(e) => {this.changeHandler(e)}} inpType="password" placeholder="Enter your password" name="password" value={this.state.form.password}/>
                            <Button classes="btn btn-primary" clicked={this.Login}>Login</Button>
                        </div>
                        </div>
                    </div>
                            <Button classes="btn btn-primary" clicked={this.Test}>Login</Button>
                </div>                
            </Aux>
        );
    }
}

export default Auth;
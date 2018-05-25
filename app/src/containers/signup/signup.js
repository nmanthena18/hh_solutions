import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Aux from '../../hoc/Auxulary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import Axios from '../../Axios';
import Alert from '../../components/UI/Alert/Alert';
class Signup extends Component {
    state ={
       form:{ 
        user_id:null,
        name:null,
        email:null,
        password:null
       },
       formValidation:{
        user_id:{
            validation:{
                required:true,
                minLength:4,
                maxLength:4,
                isNumber:true
            },
            valid:false,
            touched:false            
        },
        name:{
            validation:{
                required:true,
                minLength:4,
            },
            valid:false,
            touched:false 
        },
        email:{
            validation:{
                required:true,
                email:true
            },
            valid:false,
            touched:false 
        },
        password:{
            validation:{
                required:true,
                minLength:4,
            },
            valid:false,
            touched:false
        }
    },
    formIsValid:false
    }    

    //Handelers
    signUp = () =>{
        Axios.post('/api/signup', this.state.form).then( (data)=>{
            this.setState({
                successuser:true,
                userMsg:"New user created successfuly .!",
                alertClass:"alert-success"
            });
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
        let obj = {...this.state.form}
        obj[e.target.name]=value;

        const updateFormValidation = {...this.state.formValidation}
        updateFormValidation[e.target.name].valid = this.checkValidation(obj[e.target.name], this.state.formValidation[e.target.name]);
        updateFormValidation[e.target.name].touched = true;
        let formIsValid = true;
        for(let inputIndentifier in updateFormValidation){
            formIsValid = updateFormValidation[inputIndentifier].valid && formIsValid;
        }
        this.setState({
            form:obj,
            formValidation:updateFormValidation,
            formIsValid:formIsValid
        });       
    }

    checkValidation = (value, rules)=>{
        const vType = rules.validation;
        let isValid = true;
        if(vType.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(vType.minLength){
            isValid = value.trim().length >= vType.minLength && isValid;
        }
        if(vType.maxLength){
            isValid = value.trim().length <= vType.maxLength && isValid;
        }
        if(vType.isNumber){
            isValid = !isNaN(value) && isValid;
        }
        if(vType.email){
            let reg = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
            isValid = reg.test(value.trim()) && isValid;
        }
        return isValid;
    }

    render(){
        return(
            <Aux><form>

                <div className="row">
                    <div className="col-md-6 offset-md-3 m-t-100">
                        <h2 className="text-center"><img src="./logo.png" alt="Logo" /></h2>
                        <div className="card border-secondary" >
                        <div className="card-header"><b>Register Your self</b></div>
                        <div className="card-body">
                            <Input classes="form-control" change={this.changeHandler} 
                            isInvalid={this.state.formValidation.user_id.valid} 
                            touched={this.state.formValidation.user_id.touched}
                            name="user_id" placeholder="Enter your Id"/>
                            <Input classes="form-control" change={this.changeHandler} 
                            isInvalid={this.state.formValidation.name.valid} 
                            touched={this.state.formValidation.name.touched}
                            name="name" placeholder="Enter your Name"/>
                            <Input classes="form-control" change={this.changeHandler} 
                            isInvalid={this.state.formValidation.email.valid} 
                            touched={this.state.formValidation.email.touched}
                            inpType="email" name="email" placeholder="Enter your email"/>
                            <Input classes="form-control" change={this.changeHandler} 
                            isInvalid={this.state.formValidation.password.valid} 
                            touched={this.state.formValidation.password.touched}
                            inpType="password" name="password" placeholder="Enter your password"/>
                            <Button classes="btn btn-primary" clicked={this.signUp}
                             disabled={!this.state.formIsValid}
                            >Sign Up</Button>
                            <Link to="/"> Login </Link>
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


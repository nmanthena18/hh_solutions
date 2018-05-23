import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxulary';
import Button from '../../components/UI/Buttons/Buttons';
import Input from '../../components/UI/Input/Input';
import Axios from '../../Axios';
import {Link, Redirect, withRouter} from 'react-router-dom';
import * as actionTypes from '../../Store/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Auth extends Component {
    state ={
        form:{
            user_id:"",
            password:""
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
            password:{
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            }
        },
        formIsValid:false
    }
    Login = () =>{
        Axios.post('/api/login', this.state.form).then(res =>{
            if(res.data.email){
                this.props.login(res.data.email);
                this.setState({
                    email:res.data.email
                });
               this.props.history.push('/dashboard')
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    changeHandler = (e) => {
        let value = e.target.value;
        let obj = {...this.state.form}
        obj[e.target.name]=value;
        const updateFormElements = {
            ...this.state.formValidation
        }
        updateFormElements[e.target.name].valid = this.checkValidation(obj[e.target.name], this.state.formValidation[e.target.name]);
        updateFormElements[e.target.name].touched = true;
        let formIsValid = true;
        for(let inputIndentifier in updateFormElements){
            formIsValid = updateFormElements[inputIndentifier].valid && formIsValid;
        }
        this.setState({
            form:obj,
            formValidation:updateFormElements,
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
        return isValid;
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
                            <form autoComplete="no-value">
                                <Input classes="form-control" isInvalid={this.state.formValidation.user_id.valid} 
                                touched={this.state.formValidation.user_id.touched}
                                change={(e) => {this.changeHandler(e)}} placeholder="Enter your Id" name="user_id" value={this.state.form.user_id} />
                                <Input classes="form-control" isInvalid={this.state.formValidation.password.valid}
                                touched={this.state.formValidation.password.touched}
                                change={(e) => {this.changeHandler(e)}} inpType="password" placeholder="Enter your password" name="password" value={this.state.form.password}/>
                                <Button classes="btn btn-primary" clicked={this.Login}
                                    disabled={!this.state.formIsValid}
                                >Login</Button>
                                <Link to="/register"> Sign Up </Link>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                {this.state.email}
                {/* {this.state.email ? <Redirect to="/dashboard" /> : null}             */}
            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (auth) => dispatch({type: actionTypes.LOGIN_AUTHENDICATION, auth:auth}),
        logout: (auth) => dispatch({type: actionTypes.LOGOUT_AUTHENDICATION, auth:auth})
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(withErrorHandler(Auth, Axios)));
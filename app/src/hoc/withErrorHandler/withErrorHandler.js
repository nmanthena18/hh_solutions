import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxulary';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error:null
        }
        componentWillMount(){
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error})
            }); 
        
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} classes="error-box"
                        closeModal={this.errorConfirmHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            )
        }

        errorConfirmHandler = ()=>{
            this.setState({error:null})
        }
    }
}

export default withErrorHandler;
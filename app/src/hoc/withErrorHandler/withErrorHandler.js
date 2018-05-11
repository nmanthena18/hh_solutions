import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxulary';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error:null
        }
        componentWllMount(){
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                console.log(55)
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                console.log(55)
                this.setState({error})
            }); 
        
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} 
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
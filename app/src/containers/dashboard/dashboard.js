import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Header from '../../components/Header/Header';
import Button from '../../components/UI/Buttons/Buttons';
import Axios from '../../Axios';
import Card from '../../components/UI/card/card';
import Modal from '../../components/UI/Modal/Modal';

class Dashboard extends Component {
    Logout = () =>{
        Axios.get('/api/logout').then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
        this.setState({session:false});
    }
    render(){
        return(
            <div>
                <Header logoutHandler={this.Logout} />  
                <div className="row dashboard">
                    <div className="col">
                        <Card title="Billing">
                            <Button classes="btn btn-primary">Generate Bill</Button>
                            <i className="fas fa-hand-holding-usd fa-5x float-right"></i>
                        </Card>
                    </div>
                    <div className="col">
                        <Card title="Add/Update Item">
                            <Button classes="btn btn-primary">Add / Update Item</Button>
                            <i className="fas fa-edit fa-5x float-right"></i>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col"><p></p><p></p></div>
                </div>
                <div className="row">
                    <div className="col">                
                        <Card title="Get Quantities">
                            <Button classes="btn btn-primary">Get Available Stock</Button>
                            <i className="fab fa-stack-overflow fa-5x float-right"></i>
                        </Card>
                    </div>
                    <div className="col">
                        <Card title="Bill History">
                            <Button classes="btn btn-primary">Get All Billing History</Button>
                            <i className="fas fa-history fa-5x float-right"></i>
                        </Card>
                    </div>
                </div>
                <Modal show="true" title="Add Product">
                    14456465456
                </Modal>
            </div>
        )
    }

    //Add/Edit item 
    AddItem = () =>{
        
    }
}

export default Dashboard;
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Header from '../../components/Header/Header';
import Button from '../../components/UI/Buttons/Buttons';
import Axios from '../../Axios';
import Card from '../../components/UI/card/card';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import Aux from '../../hoc/Auxulary';

class Dashboard extends Component {
    state = {
        dashboardItems:{
            billing:{
                name:"Billing",
                icon:"fa-hand-holding-usd",
                ids:1
            },
            addproduct:{
                name:"Add Product",
                icon:"fa-edit" ,
                ids:2           
            },
            availQty:{
                name:"Get All Products Details",
                icon:"fa-stack-overflow" ,
                ids:3             
            },
            billHistory:{
                name:"Get Bill History",
                icon:"fa-history",
                ids:4              
            }
        },
        showModel:null
    }
    Logout = () =>{
        Axios.get('/api/logout').then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
        this.setState({session:false});
    }

    render(){
        let dashboardAction = [{...this.state.dashboardItems}]
        let cards = dashboardAction.map( (items, i) => {
            let eachCard =[]
            for(let item in items){
                eachCard.push( <div className="col" key={item}>
                <Card title={items[item].name}>
                    <Button classes="btn btn-primary" clicked={ this.AddItem.bind(this, item)}>{items[item].name}</Button>
                    <i className={"fas fa-5x float-right " + items[item].icon}></i>
                </Card>
                </div>
               )
            }

            return eachCard;
            
        });

        const addproduct = (
            <Aux>
                <Input name="name" inpType="text" />
                <Input name="prd_code" inpType="text" />
                <Input name="prd_shortname" inpType="text" />
                <Input name="prd_price" inpType="text" />
                <Input name="prd_qty" inpType="text" />
                <Input name="prd_gst" inpType="text" />
                <Button>Add Product </Button>
            </Aux>
        );
        return(
            <div>
                <Header logoutHandler={this.Logout} />  
                <div className="row dashboard">
                    {cards}
                </div>
                <Modal title="Add Product" show={this.state.showModel}>
                    {this.state.showModel == "addproduct" ? addproduct : null  }
                </Modal>
            </div>
        )
    }

    //Add/Edit item 
    AddItem = (e, n) =>{
        // let obj = {...this.state.dashboardItems}
        // console.log(e)
        // let show = this.state.dashboardItems[e];
        console.log(e)
        this.setState({
            showModel:e
        });

        console.log(this.state)
    }
}

export default Dashboard;
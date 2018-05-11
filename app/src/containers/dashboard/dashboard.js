import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Aux from '../../hoc/Auxulary';
import Axios from '../../Axios';
import Header from '../../components/Header/Header';
import Card from '../../components/UI/card/card';
import AddProduct from '../Products/AddProducts';
import Button from '../../components/UI/Buttons/Buttons';
import EditProduct from '../Products/editProduct';

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
                    <Link className="btn btn-primary" to="/dashboard/addproduct">{items[item].name}</Link>
                    <i className={"fas fa-5x float-right " + items[item].icon}></i>
                </Card>
                </div>
               )
            }
            return eachCard;            
        });
        return(
            <Aux>
                <Header logoutHandler={this.Logout} />
                <div className="row">                  
                    { this.props.match.isExact ? <div className="row dashboard"> {cards} </div> : null }    
                </div>          
                <Route path='/dashboard/addproduct' component={AddProduct} />
                <Route path='/dashboard/editPrduct/:id' component={EditProduct} />
            </Aux>
        )
    }
}

export default withErrorHandler(Dashboard, Axios);
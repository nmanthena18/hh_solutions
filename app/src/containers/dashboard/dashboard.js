import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
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
                ids:1,
                pathname:'billing'
            },
            addproduct:{
                name:"Add Product",
                icon:"fa-edit" ,
                ids:2,
                pathname:'products'      
            },
            availQty:{
                name:"Get All Products Details",
                icon:"fa-shopping-cart" ,
                ids:3             
            },
            billHistory:{
                name:"Get Bill History",
                icon:"fa-history",
                ids:4,
                pathname:'billinghistory'            
            },
            DailyBillHistory:{
                name:"Today Bill History",
                icon:"fa-history",
                ids:5              
            }
        },
        showModel:null
    }
    

    render(){
        console.log(this.state)
        let dashboardAction = [{...this.state.dashboardItems}]
        let cards = dashboardAction.map( (items, i) => {
            let eachCard =[]
            for(let item in items){
                eachCard.push( <div className="col text-center" key={item}>
                <Card title={items[item].name} className="">                    
                    <p className="text-center clearfix"><i className={"fas fa-3x " + items[item].icon}></i></p>
                    <Link className="btn btn-primary" to={"/dashboard/"+items[item].pathname}>{items[item].name}</Link>
                </Card>
                </div>
               )
            }
            return eachCard;            
        });
        return(
            <Aux>
                <Header logoutHandler={this.Logout} />              
                    { this.props.match.isExact ? <div className="row dashboard"> {cards} </div> : null }           
                <Route path='/dashboard/products' component={AddProduct} />
            </Aux>
        )
    }


}

const mapStateToProps = (state) =>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps) (withErrorHandler(Dashboard, Axios));
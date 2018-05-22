import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Aux from '../../hoc/Auxulary';
import Axios from '../../Axios';
import Header from '../../components/Header/Header';
import Card from '../../components/UI/card/card';
import AddProduct from '../Products/AddProducts';
import DisplayAllProductsInfo from '../Products/AllProduct';

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
            allProducts:{
                name:"Get All Products Details",
                icon:"fa-shopping-cart" ,
                ids:3 ,
                pathname:'allproducts'            
            },
            billHistory:{
                name:"Get Bill History",
                icon:"fa-history",
                ids:4,
                pathname:'billinghistory'            
            },
            // DailyBillHistory:{
            //     name:"Today Bill History",
            //     icon:"fa-history",
            //     ids:5              
            // }
        },
        showModel:null,
    }
    

    render(){
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
                <Header logoutHandler={this.Logout} {...this.props} />              
                 { this.props.match.isExact ? <div className="row dashboard"> {cards} </div> : null }           
                <Route path='/dashboard/products' component={AddProduct} />
                <Route path='/dashboard/allproducts' component={DisplayAllProductsInfo} />
            </Aux>
        )
    }

}

const mapStateToProps = (state) =>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps) (withRouter(withErrorHandler(Dashboard, Axios)));
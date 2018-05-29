import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from '../../Axios';

import DataGrid from '../DataGrid/DataGrid';
import Aux from '../../hoc/Auxulary';
import * as Data from '../../components/commonData/commonData';
import Card from '../../components/UI/card/card';
// import Button from '../../components/UI/Buttons/Buttons';

class AllProducts extends Component { 
    state ={
        columns: Data.allProductHeader,
        availablePrdsInfo:null
    }
    render(){
        return(
            <Aux>
                <Card title="Quick view information"> 
                    <h5 className="card-title">All Available product/items information</h5>
                    { this.state.availablePrdsInfo ?
                    <table className="table alert alert-warning table-striped">
                        <tbody>
                        <tr>
                            <td><h6>Type of Products Count</h6></td>
                            <td> <h5>{this.state.availablePrdsInfo.typeOfPrds}</h5></td>
                            <td><h6>Total stock in your store</h6></td>
                            <td> <h5>{this.state.availablePrdsInfo.stock}</h5></td>
                        </tr>
                        <tr>
                            <td><h6>Total Cost of Stock</h6></td>
                            <td> <h5>{this.state.availablePrdsInfo.stockAmount}</h5></td>
                            <td><h6>Total S Code of Stock</h6></td>
                            <td> <h5>{this.state.availablePrdsInfo.stockAmountCode}</h5></td>
                        </tr>
                        </tbody>
                    </table>
                    : null }
                </Card>
               <DataGrid gridData={this.props.productsData || this.state.gridData} columns={this.state.columns} />
            </Aux>
        )
    }
    //if the products not loaded in redux it will called
    loadAllProduct(){
        let config = {
            headers: { 'x-access-token': localStorage.getItem("token") },
          };
        Axios.get('/api/loadAllPrds').then(res => {
            res.data.map((item, i) => {
                return  item["prd_created_date"] = new Date(item["prd_created_date"]).toLocaleDateString();
            });
            this.setState({
                gridData:res.data
            });
            this.informationOfAllProducts();
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount(){
        if(!this.props.productsData){
            this.loadAllProduct();            
        }else{
            this.informationOfAllProducts();
        }
    }
    informationOfAllProducts = () =>{
        let products = Object.assign(this.props.productsData || this.state.gridData);
        let stock = 0;
        let totalStackAmount = 0;
        let totalStackAmountCode = 0;
        let prdsInfo = {}
        for( let i=0; i<products.length; i++){
            prdsInfo.typeOfPrds = i+1;
            prdsInfo.stock = stock+= parseInt(products[i].prd_qty, 10);
            prdsInfo.stockAmount = totalStackAmount+=parseInt(products[i].prd_price * products[i].prd_qty, 10);
            prdsInfo.stockAmountCode = totalStackAmountCode+=parseInt(products[i].prd_scode * products[i].prd_qty, 10);
        }

        this.setState({
            availablePrdsInfo :prdsInfo
        })
    }
}

const mapStateToProps = (state) =>{
    return {
        auth:state.auth,
        productsData:state.productsData
    }
}

export default connect(mapStateToProps) (AllProducts);
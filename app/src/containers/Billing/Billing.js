import React, {Component} from 'react';

import Aux from '../../hoc/Auxulary';
import AutoComplete from '../AutoComplete/AutoComplete';
import Axios from '../../Axios';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';

class Billing extends Component {
        state = {
            data:"",
            cardItems:[],
            totals:{
                totalAmount:0,
                totalGST:0,
                totalQty:0
            }
        }
    render(){
        let BillSummary
            if(this.state.cardItems){
                BillSummary = this.state.cardItems.map( (item, i, arr) =>{
                    let ii = i+1
                    return <tr key={ii}>
                            <td>{ii}</td>
                            <td>{item.prd_name}</td>
                            <td>{item.prd_price}</td>
                            <td>{item.totalGST}</td>
                            <td><Input change={(e) => this.addToItemHandler(item, e.target.value)} classes="qty-input form-control" value={item.purchaseQty} name="qty" placeholder="Enter Qty" /></td>
                            <td>{item.totalPrice}</td>
                            <td><Button classes="btn btn-success" clicked={(e) => this.addToItemHandler(item, parseInt(item.purchaseQty) + 1)}><i className="fas fa-plus-circle"></i></Button> &nbsp;
                                <Button classes="btn btn-danger" clicked={(e) => this.removeItemHandler(item)} ><i className="fas fa-trash-alt"></i></Button></td>
                        </tr>
                });
            }
        return(
            <Aux>
                <div className="row">
                    <div className="col-3"></div>
                        <div className="col-6">
                            <AutoComplete data={this.state.data} query={this.searchQuery} itemSelected={this.addToItemHandler} />
                        </div>
                    <div className="col-3"></div>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                    <table className="billSummaryTable table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price per item</th>
                                <th>GST</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BillSummary}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total GST : {this.state.totals.totalGST}</td>
                                <td>Total Quantity : {this.state.totals.totalQty}</td>
                                <td>Total Amount : {this.state.totals.totalAmount} </td>
                                <td> With GST : {this.state.totals.totalAmount + this.state.totals.totalGST}</td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                    <div className="col-1"></div>
                </div>
            </Aux>
        )
    }
    searchQuery = (e) =>{
        if(e.length > 1){
            Axios.post('api/getProductInfo', {query:e}).then( res =>{
                this.setState({
                    data:res.data
                });
            }).catch(err => console.log(err));
        }
    }
    
    addToItemHandler =(item, e) =>{
        let dataCopy = Object.assign(this.state.cardItems);
        item.purchaseQty = e;
        item.totalPrice = item.prd_price * e;
        item.totalGST = item.prd_gst * e;
        if(item.prd_qty < e){
            alert("You have only "+item.prd_qty+ " available item you can't add more than available..!");
            return;
        }
        let isExist = this.state.cardItems.includes(item);
        if(!isExist){
            dataCopy.push(item);
        }
        let sum = this.calculateTotal();
        if(this.state.data){
            this.setState({
                cardItems:dataCopy,
                totals:sum
            });
        }
    }

    removeItemHandler = (item) => {
        let dataCopy = Object.assign(this.state.cardItems);
        let index = dataCopy.indexOf(item);
        if(index > -1){
            dataCopy.splice(index, 1);
        }
        this.setState({
            cardItems:dataCopy,
            totals:this.calculateTotal()
        });

    }

    calculateTotal = () =>{
        let obj = {
            totalAmount:0,
            totalGST:0,
            totalQty:0
        }
        for(let i = 0; i < this.state.cardItems.length; i++){
            obj.totalAmount+= this.state.cardItems[i].prd_price * this.state.cardItems[i].purchaseQty;
            obj.totalGST+= this.state.cardItems[i].prd_gst * this.state.cardItems[i].purchaseQty;
            obj.totalQty+= this.state.cardItems[i].purchaseQty;
        }
        return obj;
    }
}

export default Billing;
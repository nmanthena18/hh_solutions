import React, {Component} from 'react';

import Aux from '../../hoc/Auxulary';
import AutoComplete from '../AutoComplete/AutoComplete';
import Axios from '../../Axios';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttons/Buttons';
import Modal from '../../components/UI/Modal/Modal';
import Alert from '../../components/UI/Alert/Alert';

class Billing extends Component {
        state = {
            data:"",
            cartItems:[],
            totals:{
                totalAmount:0,
                totalGST:0,
                totalQty:0
            },
            showRecords:null,
            paymentMethod:"CASH",
            receivedAmount:"",
            customer_name:"NO Name",
            queryString:""
        }
    render(){
        let BillSummary
            if(this.state.cartItems){
                BillSummary = this.state.cartItems.map( (item, i, arr) =>{
                    let ii = i+1
                    return <tr key={ii}>
                            <td>{ii}</td>
                            <td>{item.prd_name}</td>
                            <td>{item.prd_price}</td>
                            <td>{item.prd_qty - this.state.totals.totalQty }</td>
                            <td>{item.totalGST}</td>
                            <td><Input change={(e) => this.addToItemHandler(item, e.target.value, 'input')} classes="qty-input form-control" value={item.purchaseQty} name="qty" placeholder="Enter Qty" /></td>
                            <td>{item.totalPrice}</td>
                            <td><Button classes="btn btn-success" clicked={(e) => this.addToItemHandler(item, 1)}><i className="fas fa-plus-circle"></i></Button> &nbsp;
                                <Button classes="btn btn-danger" clicked={(e) => this.removeItemHandler(item)} ><i className="fas fa-trash-alt"></i></Button></td>
                        </tr>
                });
            }
        return(
            <Aux>
                <div className="row">
                    <div className="col-3"></div>
                        <div className="col-6">
                            <AutoComplete queryString={this.state.queryString} recordsShow={this.state.showRecords} data={this.state.data} query={this.searchQuery} itemSelected={this.addToItemHandler} />
                        </div>
                    <div className="col-3"></div>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                    <Alert classes="alert-success" show={this.state.alert} type="success" close={(e) => this.closeAlert(e)}>
                        Invoice generated successfully Please Note Bill Number <b>#{this.state.BillNumber}</b>
                    </Alert>
                     <Alert classes="alert-danger" show={this.state.alertDanger} type="danger" close={(e) => this.closeAlert(e)}>
                        {this.state.alertDangerMsg}
                    </Alert>
                    <table className="billSummaryTable table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price per item</th>
                                <th>Avail Qty</th>
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
                                <td></td>
                                <td>Total GST : {this.state.totals.totalGST}</td>
                                <td>Total Quantity : {this.state.totals.totalQty}</td>
                                <td>Total Amount : {this.state.totals.totalAmount} </td>
                                <td> With GST : {this.state.totals.totalAmount + this.state.totals.totalGST}</td>
                            </tr>
                            <tr>
                                <td colSpan="8" align="right">
                                    <Button disabled={this.state.cartItems.length <= 0} 
                                    clicked={this.generateBill}
                                    classes="btn btn-warning">Generate Bill</Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                    <div className="col-1"></div>
                </div>
                <Modal show={this.state.generateShow} title="Generate Invoice">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Total GST </th>
                                <th>Total Quantity </th>
                                <th>Total Amount </th>
                                <th>With GST </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.totals.totalGST}</td>
                                <td>{this.state.totals.totalQty}</td>
                                <td>{this.state.totals.totalAmount} </td>
                                <td>{this.state.totals.totalAmount + this.state.totals.totalGST} </td>
                            </tr>
                        </tbody>
                    </table>
                    <p>* Please choose below option to genarate final invoice</p>
                    <div show={this.state.paymentMethod} className="alert alert-primary">
                        <div className="row">
                            <div className="col"><br/>
                                <Input name="customer_name"
                                 classes="form-control" placeholder="Customer Name"
                                 change={(e)=> this.nameChangeHandler(e)}
                                 value={this.state.customer_name} />
                            </div>
                            <div className="col">
                                Payment method :
                                <Input inpType="select" classes="form-control"
                                        change={(e)=> this.payamentMethodHandler(e)}
                                        name="paymentMethod"
                                        defaultValue={this.state.paymentMethod}
                                    >
                                    <option value="CASH">CASH</option>
                                    <option value="CARD">CARD</option>
                                    <option value="OTHER">OTHER</option>
                                </Input>
                            </div>
                            <div className="col"></div>
                        </div>
                            <p>* You have choosen payment type is : {this.state.paymentMethod}</p>
                            <p style={{backgroundColor:"#ffeeba", padding:"5px"}}><input type="checkbox" onChange={this.withGST} /> * Please check this box for GST : </p>
                            <div className="row">
                                <div className="col">Total Aomunt : <Input disabled="true" classes="form-control" value={this.state.withGST ? this.state.totals.totalAmount + this.state.totals.totalGST : this.state.totals.totalAmount}  /></div>
                                <div className="col">Received Aomunt :<Input value={this.state.receivedAmount} 
                                classes="form-control" change={(e) => this.receivedAmountHandler(e)}
                                 /></div>
                                <div className="col"></div>
                                <div className="col"></div>
                            </div>
                            <div className="row">
                                <div className="col"></div>
                                <div className="col"></div>
                                <div className="col"></div>
                                <div className="col text-right">
                                    <Button disabled={this.state.cartItems.length <= 0} 
                                        clicked={this.cancelInvoiceHandler}
                                        classes="btn btn-danger form-control">CANCEL</Button>
                                </div>
                                <div className="col text-right">                                    
                                    <Button 
                                        disabled={!this.state.receivedAmount}
                                        clicked={this.generateInvoiceHandler}
                                        classes="btn btn-success">GENERATE INVOICE</Button>
                                </div>
                            </div>
                    </div>
                </Modal>
            </Aux>
        )
    }

    config = {
        headers: { 'x-access-token': localStorage.getItem("token") },
    };
    
    searchQuery = (e) =>{
        this.setState({queryString:e})
        if(e.length > 1){
            Axios.post('api/getProductInfo', {query:e}, this.config).then( res =>{
                this.setState({
                    showRecords:true,
                    data:res.data
                });
            }).catch(err => console.log(err));
        }        
    }
    
    addToItemHandler =(item, q, fromInput) =>{
        let e = parseInt(q, 10) === 0 ? 1 : parseInt(q, 10) ;
        if(isNaN(e)){
            alert("Please enter numbers only");
            return;
        }
        let stateItemIndexPos = this.existElement(this.state.data, item);
        let indexPos = this.existElement(this.state.cartItems, item);
        let purchaseItemQty = this.state.cartItems[indexPos] ? this.state.cartItems[indexPos].purchaseQty : e;
        let dataCopy = Object.assign(this.state.cartItems);
        
        // checking user change from where
        if(fromInput){
            purchaseItemQty = e;
        }else{
            purchaseItemQty+=e;
        }
        // if selected quantity > than available
        if(this.state.data[stateItemIndexPos].prd_qty < purchaseItemQty){
            alert("You have only "+item.prd_qty+ " available item you can't add more than available..!");
            return;
        }
   
        let isExist = this.state.cartItems.some(function (el) {
            return el.prd_id === item.prd_id;
        });
        if(!isExist){
            item.purchaseQty = e;
            item.totalPrice = item.prd_price * e;
            item.totalGST = item.prd_gst * e;  
            dataCopy.push(item);
        }else{
            dataCopy[indexPos].purchaseQty = e > 1 ? e : this.state.cartItems[indexPos].purchaseQty = purchaseItemQty;
            dataCopy[indexPos].totalPrice = this.state.cartItems[indexPos].purchaseQty * this.state.cartItems[indexPos].prd_price;
        }
        let sum = this.calculateTotal();
        //updating state
        if(this.state.data){
            this.setState({
                cartItems:dataCopy,
                totals:sum,
                showRecords:false,
                queryString:'',
            });
        }
    }

    removeItemHandler = (item) => {
        let dataCopy = Object.assign(this.state.cartItems);
        let index = dataCopy.indexOf(item);
        if(index > -1){
            dataCopy.splice(index, 1);
        }
        this.setState({
            cartItems:dataCopy,
            totals:this.calculateTotal()
        });

    }

    calculateTotal = () =>{
        let obj = {
            totalAmount:0,
            totalGST:0,
            totalQty:0
        }
        for(let i = 0; i < this.state.cartItems.length; i++){
            obj.totalAmount+= this.state.cartItems[i].prd_price * this.state.cartItems[i].purchaseQty;
            obj.totalGST+= this.state.cartItems[i].prd_gst * this.state.cartItems[i].purchaseQty;
            obj.totalQty+= parseInt(this.state.cartItems[i].purchaseQty, 10);
        }
        return obj;
    }

    generateBill = () =>{
        this.setState({generateShow:true})
    }

    payamentMethodHandler = (e) =>{
        this.setState({paymentMethod:e.target.value})
    }

    withGST = () =>{
        this.setState({
            withGST: !this.state.withGST
        })
    }

    cancelInvoiceHandler = () =>{
        this.setState({generateShow:false});
    }

    receivedAmountHandler = (e) =>{
        if(isNaN(e.target.value)){
            alert("Please enter numbers only.!");
            return;
        }else{
            this.setState({receivedAmount:e.target.value});
        }
    }

    nameChangeHandler = (e) =>{
        this.setState({
            customer_name:e.target.value
        })
    }

    generateInvoiceHandler = ()=>{
        let data = {
            cart: this.state.cartItems,
            paymentMethod: this.state.paymentMethod,
            receivedAmount: this.state.receivedAmount,
            totals: this.state.totals,
            customer_name: this.state.customer_name,
        }
        Axios.post('/api/generateInvoice', data, this.config).then( res =>{
            if(res.data.message){
                this.setState({alertDanger:true, alertDangerMsg:res.data.message, generateShow:false});
                return
            }
           this.setState({generateShow:false, alert:true, BillNumber:res.data.insertId, cartItems:[], totals:{
            totalAmount:0,
            totalGST:0,
            totalQty:0
           }})
        }).catch(err=> console.log(err));
    }
    
    existElement = (parent, child) => {
        var i=0;
        for (let p in parent) {
            if (parent[i].prd_id === child.prd_id) {
                return i;
            }
            i++;
        }
        return -1;
    }; 

    closeAlert =(n) =>{
        if(n === "danger"){
            this.setState({alertDanger:false});
        }else if(n === "success"){
            this.setState({alert:false});
        }
    }
}

export default Billing;
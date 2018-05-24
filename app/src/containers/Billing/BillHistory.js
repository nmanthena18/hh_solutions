import React, {Component} from 'react';

import Aux from '../../hoc/Auxulary';
import Axios from '../../Axios';
import * as Headers from '../../components/commonData/commonData';
import DataGrid from '../DataGrid/DataGrid';
import Modal from '../../components/UI/Modal/Modal';

class BillHistory extends Component {
    
    state = {
        gridData:null,
        Header:Headers.BillHistoryHeader,
        viewBill:false,
        viewBillData:null,
        billPrds:null
    }
    constructor(){
        super()
        this.getBillHistory();
    }
    render(){
            let BillInfo
            if(this.state.viewBillData && this.state.billPrds){
                let data = this.state.viewBillData[0];    
                let items = this.state.billPrds.prds_info.map( (item, i) =>{
                    return (<tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.prd_name}</td>
                        <td>{this.state.billPrds.bill_info[i].prd_qty}</td>
                        <td>{this.state.billPrds.bill_info[i].prd_qty} X {item.prd_price} = {this.state.billPrds.bill_info[i].total}</td>
                        <td>{item.prd_scode}</td>
                    </tr>)
                });       
                BillInfo = <Aux><table className="table alert alert-primary">
                    <thead>
                    <tr><th>Bill Number / Id</th><th>Customer Name</th><th>Payment Type</th><th>Total Amount</th><th>Received Amount</th><th>Purchase Date</th></tr>
                    </thead>
                    <tbody>                        
                        <tr>
                            <td>{data["bill_id"]}</td>
                            <td>{data.customer_name}</td>
                            <td>{data.payment_type}</td>
                            <td>{data.total_amount}</td>
                            <td>{data.received_amount}</td>
                            <td>{data.created}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table">
                    <thead>
                        <tr><th>#</th><th>Name</th><th>Purchased Quantity</th><th>Actual Total</th><th>S Code</th></tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                </Aux>

            }
        return(
            <Aux>
                 <DataGrid gridData={this.state.gridData} columns={this.state.Header}  edit={this.viewBill} />
                 <Modal show={this.state.viewBill} title="View Bill Details" closeModal ={this.closeModal}>
                    {BillInfo }
                 </Modal>
            </Aux>
        )
    }

    //get billing details

    getBillHistory = () =>{
        Axios.get('/api/getbillhistory').then(res =>{
            res.data.map((item, i) => {
                return  (item["created"] = new Date(item["created"]).toLocaleDateString(), item["id"] = item["bill_id"] )
            });
                this.setState({gridData:res.data});
            }).catch (err =>{
            console.log(err)
        })
    }
    viewBill = (id) =>{
       let BillDetails =  this.state.gridData.filter((v, i) =>{
            return id === v.bill_id
       });
       Axios.post('/api/getsinglebillinformation', {id}).then( res =>{
            this.setState({billPrds:res.data});
       }).catch(err =>{
           console.log(err)
       });
       this.setState({viewBillData:BillDetails, viewBill:true});
       
    }

    closeModal = () =>{
        this.setState({viewBill:false});
    }
    
}

export default BillHistory;
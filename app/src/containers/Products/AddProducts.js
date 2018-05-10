import React, { Component } from 'react';

import Aux from '../../hoc/Auxulary';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Buttons/Buttons';
import Input from '../../components/UI/Input/Input';
import Card from '../../components/UI/card/card';
import Alert from '../../components/UI/Alert/Alert';
import Axios from '../../Axios';
import DataGrid from '../DataGrid/DataGrid';

class AddProduct extends Component {   
    state ={
        showModel:false,
        prd_added:false,
        isFormValid:false,
        form:{
            prd_name:null,
            prd_scode:null,
            prd_shortname:null,
            prd_price:null,
            prd_qty:null,
            prd_gst:null,
            prd_desc:''
        },
        formValidation : {
            prd_name:{
                validation:{
                    required:true,
                    minLength:4,
                },
                valid:false,
                touched:false
            },
            prd_scode:{
                validation:{
                    required:true,
                    isNumber:true
                },
                valid:false,
                touched:false
            },
            prd_shortname:{
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            prd_price:{
                validation:{
                    required:true,
                    isNumber:true
                },
                valid:false,
                touched:false
            },
            prd_qty:{
                validation:{
                    required:true,
                    isNumber:true,
                    maxLength:3,
                },
                valid:false,
                touched:false
            },
            prd_gst:{
                validation:{
                    required:true,
                    isNumber:true,
                    maxLength:2,
                },
                valid:false,
                touched:false
            },
            prd_desc:{
                validation:{
                    required:null,
                },
                valid:true,
                touched:false
            }
        }
    }


    render(){
        this.init();
        const addproduct = (
            <Aux>
                <Input name="prd_name" 
                    placeholder="Enter Product Name"
                    change={(e) => {this.changeHandler(e)}}
                    isInvalid={this.state.formValidation.prd_name.valid} 
                    touched={this.state.formValidation.prd_name.touched}
                    classes="form-control" inpType="text" />
                <Input name="prd_scode" 
                    placeholder="Enter Product Code"
                    inputGroupSymbol="Number only"
                    isInvalid={this.state.formValidation.prd_scode.valid} 
                    touched={this.state.formValidation.prd_scode.touched}
                    change={(e) => {this.changeHandler(e)}}
                    classes="form-control" inpType="text"></Input> <br/>
                <Input name="prd_shortname" 
                    placeholder="Enter Product Short Name"
                    isInvalid={this.state.formValidation.prd_shortname.valid} 
                    touched={this.state.formValidation.prd_shortname.touched}
                    change={(e) => {this.changeHandler(e)}}
                    classes="form-control" inpType="text" />
                <Input name="prd_price" 
                    inputGroupSymbol="INR" placeholder="Enter Product Price"
                    isInvalid={this.state.formValidation.prd_price.valid} 
                    touched={this.state.formValidation.prd_price.touched}
                    change={(e) => {this.changeHandler(e)}} 
                    classes="form-control" inpType="text" /> <br/>
                <Input name="prd_qty" 
                    placeholder="Enter Product Quantity" value="1" 
                    change={(e) => {this.changeHandler(e)}}
                    isInvalid={this.state.formValidation.prd_qty.valid} 
                    touched={this.state.formValidation.prd_qty.touched}
                    inputGroupSymbol="Number Only"
                    classes="form-control" inpType="text" /> <br/>
                <Input name="prd_gst" 
                    inputGroupSymbol="%"
                    placeholder="Enter Product GST" value="18"
                    change={(e) => {this.changeHandler(e)}}
                    isInvalid={this.state.formValidation.prd_gst.valid} 
                    touched={this.state.formValidation.prd_gst.touched}
                    classes="form-control" inpType="text" /> <br/>
                <Input name="prd_desc" 
                    placeholder="Enter Description"
                    change={(e) => {this.changeHandler(e)}}
                    isInvalid={this.state.formValidation.prd_desc.valid} 
                    touched={this.state.formValidation.prd_desc.touched}
                    value={this.state.form.prd_desc}
                    classes="form-control" inpType="textarea">
                    </Input>                
                <Button classes="btn btn-primary" disabled={!this.state.isFormValid} clicked={() => {this.saveProduct()}}>Save Product </Button> &nbsp;
                <Button classes="btn btn-danger" clicked={this.closeModal}>Cancel</Button>
            </Aux>
        );
        return(
            <Aux>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col text-center mt-5">
                        <Card title="Add Products"> 
                            <h5 className="card-title">To Add Products Click on the below button</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <Button classes="btn btn-success" clicked={this.AddItem}>
                                <i className="fas fa-cart-plus"></i> Add Product 
                            </Button>
                        </Card>
                        <Alert classes="alert-success" show={this.state.prd_added}>Product Added Successfully</Alert>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-2"></div>
                    <div className="col text-center">
                            <h4>Please type here to filter existing products</h4>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter Product Name / Short Name"  />
                            <div className="input-group-append">
                                <Button classes="btn btn-primary" type="button">Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <Modal title="Add Product" show={this.state.showModel} closeModal={this.closeModal}>
                    {addproduct}
                </Modal>
                <DataGrid gridData={this.state.gridData} columns={this.state.columns}>
                    {this.state.gridData > 0 ?  null : <p>No data Available </p>}
                </DataGrid>
            </Aux>
        )
    }

    // Please call all initial functions in this function 
    init(){
        this.loadAllProduct();
    }

    //Add/Edit item 
    AddItem = (e, n) =>{
        this.setState({
            showModel:true
        })
    }

    closeModal = () =>{
        this.setState({showModel:false});
    }

    saveProduct(){
        Axios.post('/api/saveProduct', this.state.form).then(res => {
            if(res.data.message){
                this.setState({prd_added:true})
            }
        }).catch(err => {
            console.log(err);
        });
        this.setState({showModel:false});
    }

    //get all products
    loadAllProduct(){
        Axios.get('/api/loadAllPrds').then(res => {
            if(!this.state.columns && !this.state.gridData){
                this.setState({
                    gridData : res.data,
                    columns: [{key:"prd_name", name:"Name"},{key:"prd_price", name:"Price"}, {key:"prd_qty",name:"Available Quantity"}, {key:"prd_scode",name:"Code"}, {key:"prd_desc",name:"Description"}, {key:"prd_gst", name:"GST %"}]
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    changeHandler(e){
        let element = e.target.name;
        let form = {...this.state.form}
        form[element] = e.target.value;
        let formValidation = {...this.state.formValidation}
        formValidation[element].valid = this.checkValidation( e.target.value, this.state.formValidation[element])
        formValidation[element].touched = true;
        let isFormValid = true;
        for(let inputIndentifier in formValidation){
            isFormValid = formValidation[inputIndentifier].valid && isFormValid;
        }
        this.setState({form, formValidation, isFormValid});
    }

    checkValidation = (value, rules)=>{
        const vType = rules.validation;
        let isValid = true;
        if(vType.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(vType.minLength){
            isValid = value.trim().length >= vType.minLength && isValid;
        }
        if(vType.maxLength){
            isValid = value.trim().length <= vType.maxLength && isValid;
        }
        if(vType.isNumber){
            isValid = !isNaN(value) && isValid;
        }
        return isValid;
    }
    
    componentDidUpdate(){
        if(this.state.prd_added){
            setTimeout(() => {
                this.setState({
                    prd_added:false
                })
            }, 2000)
        }
    }
    
}

export default AddProduct;
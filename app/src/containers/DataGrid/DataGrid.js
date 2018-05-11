import React, { Component } from 'react';
import Aux from '../../hoc/Auxulary';
import Columns from './columns';
import Input from '../../components/UI/Input/Input';
import './DataGrid.css';

export default class DataGrid extends Component {
    state = {
        header: null,
        data:null,
    }   
    
    render() {
        let Body;        
        const generateColumns = (row) => {
            let columns = this.props.columns.map((item, i, arr)=>{
                let id = row[item.key];
                return <Columns key={item.key} name={row[item.key]} edit={() => this.props.edit(id)} {...item}>{row[item.key]}</Columns>
            });
            return columns;
        }
        if(this.state.data){
            Body = this.state.data.map( (item, i, arr)=>{ 
                return (
                    <div className="row body" key={"row-"+i}>
                        {generateColumns(item)}
                    </div>
                )
            });           
                      
        }
        let Header = this.props.columns.map((item, i)=>{
            return <Columns key={item.key} name={item.name}> <p>{item.name}</p> <Input type="text" classes="form-control" placeholder={"Search by "+ item.name} key={item.key} name={item.key} change={(e) => {this.filterGrid(e, item.key)}}  /> </Columns>
        });
        return (
            <Aux>
                <div className="react-grid">
                    <div className="row header">{Header}</div>
                    {this.state.data ?  Body : <p className="text-center">No Data Available </p>}
                    {this.props.children}
                </div>
            </Aux>
        )
    }
    
    filterGrid = (e, q) =>{
        let string = e.target.value.toLowerCase();
        let filterArray = this.props.gridData ? this.props.gridData.filter( (v, i,arr) =>{
            return v[q].toString().toLowerCase().indexOf(string) > -1;
        }) : null;      
        this.setState(
            {
                data: filterArray
            }
        )
       
    }
    updateState = () =>{
        if(!this.state.data){
        this.setState({
            data:this.props.gridData
        });
        }
    }

    edit(id){
        alert(id)
    }

    componentWillUpdate(){
        this.updateState()
    }
    


}
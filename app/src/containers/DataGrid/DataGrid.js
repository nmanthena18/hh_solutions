import React, { Component } from 'react';
import Aux from '../../hoc/Auxulary'

export default class DataGrid extends Component {
    
    render() {
        let Row = null;
        if(this.props.columns){
           Row = this.props.rowsCount.map( (item, i, arr)=>{
                return (<div className="row" key={"row"+i}>
                    {columns}
                </div>)
            });
        }
        let columns = null
        if(this.props.columns){
            columns = this.props.columns.map((item, i, arr)=>{
                return <div className="col" key={"col"+i}>{item.name}</div>
            });
            console.log(columns)
        }
        return (
            <Aux {...this.props}>    
                        {Row} 
                {this.props.children}
            </Aux>
        )
    }

}
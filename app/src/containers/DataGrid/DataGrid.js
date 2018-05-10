import React, { Component } from 'react';
import Aux from '../../hoc/Auxulary';
import Columns from './columns';

export default class DataGrid extends Component {
    
    render() {
        // this.setState({
        //     gridData:{...this.props.columns.push(this.props.gridData)}
        // });
        
        const generateColumns = (row) => {
            let columns = this.props.columns.map((item, i, arr)=>{
                return <Columns key={item.key} name={row[item.key]}/>
            });
            return columns;
        }
        
        
        let Row, Header = null;
        if(this.props.columns){
           Row = this.props.gridData.map( (item, i, arr)=>{
                return (                
                    <div className="row" key={"row"+i}>
                        {generateColumns(item)}
                    </div>
                )
            });

            Header = this.props.columns.map((item, i)=>{
                return <Columns key={item.key} name={item.name}/>
            });
        }
        return (
            <Aux {...this.props}>
                <div className="row header">{Header}</div>
                {Row} 
                {this.props.children}
            </Aux>
        )
    }

}
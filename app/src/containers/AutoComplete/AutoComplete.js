import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';

class AutoComplete extends Component {
    state ={
        data:null
    }
    render(){
        let filterData
        if(this.state.query && this.props.data){
            let query = this.state.query.toString().toLowerCase();
            let queryData = this.props.data.filter( (item, i, a) =>{
                return item.prd_name.toString().toLowerCase().indexOf(query) > -1 || item.prd_shortname.toString().toLowerCase().indexOf(query) > -1;
            });

            filterData = queryData.map((item, i, arr) =>{
                let qtyClass = item.prd_qty <= 0 ? 'red' : 'qty';
                return <li key={i} onClick={() => this.props.itemSelected(item, 1)} className='item' id={item.prd_id}><label>{item.prd_name}</label><span className="price">INR: {item.prd_price}</span><span className={qtyClass}>AQ :{item.prd_qty}</span></li>;
            });

            if(this.state.query && queryData && queryData.length == 0){
                filterData= <li className='item'>No records found</li>;
            }
        }
        return(
            <div className="autocomplete-component">
                <Input classes="autocomplete" placeholder="Type product name"
                value={this.props.queryString}
                name="autocomplete" change={this.changeHandler}/>
                <i className="fas fa-search"></i>
                {this.props.recordsShow ? <ul className="records" >
                    {filterData}
                </ul> : null }
            </div>
        )
    }

    changeHandler = (e) =>{
        this.props.query(e.target.value); 
        this.setState({query:e.target.value});
    }
}

export default AutoComplete;
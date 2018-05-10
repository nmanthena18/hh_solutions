import Axios from '../../Axios';

export const signUp = () =>{
    Axios.post('/api/signup', this.state.form).then( (data)=>{
        this.setState({
            successuser:true,
            userMsg:"New user created successfuly .!",
            alertClass:"alert-success"
        });
    }).catch((err)=>{
        this.setState({
            successuser:true,
            userMsg:err.response.data.message,
            alertClass:"alert-danger"
        })
    })
}

export const changeHandler = (e) => {
    let value = e.target.value;
    let obj = {...this.state.form}
    obj[e.target.name]=value
   this.setState({
        form:obj
    });        
}
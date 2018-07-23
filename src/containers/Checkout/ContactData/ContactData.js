import React , { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        customer:{
            name: '',
            email:'',
            street:'',
            postCode:''    
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();//do not reload the page
        this.setState({loading: true});
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: this.state.customer,
            userid: localStorage.getItem("userid")
        }
        //links.json just for firebase

        axios.post('/orders.json', order)
        .then(response=>{
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error=>{
            this.setState({loading: false});
        });
    }

    inputChangedHandler = (event,name) =>{
        const updatedCustomer = {
            ...this.state.customer
        }
        updatedCustomer[name] = event.target.value;

        this.setState({customer: updatedCustomer});
    }

    render (){
        let form = (
            <form onSubmit={this.orderHandler}>
                <Input inputtype="input" type="text" name="name" placeholder="Name"  onChange={(event)=>this.inputChangedHandler(event,"name")}/>
                <Input inputtype="input" type="email" name="email" placeholder="Email" onChange={(event)=>this.inputChangedHandler(event,"email")}/>
                <Input inputtype="input" type="text" name="street" placeholder="Street" onChange={(event)=>this.inputChangedHandler(event,"street")}/>
                <Input inputtype="input" type="text" name="post" placeholder="Post Code" onChange={(event)=>this.inputChangedHandler(event,"postCode")}/>
                <Button btnType="Success"clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return(

            <div className={classes.ContactData}>
                <h4>Enter your Contact data</h4>
                {form}
            </div>        
        );

    }
}

export default ContactData;
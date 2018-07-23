import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from'../../axios-orders';
import withErrorHanler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state={
        orders:[],
        loading: true
    }
    
    componentDidMount(){
        const queryParams = '?orderBy="userid"&equalTo="' + localStorage.getItem("userid") + '"';
        axios.get('/orders.json'+queryParams)
            .then( res => {
                const fetchOrders =[];console.log(res.data);
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({loading:false, orders:fetchOrders});
            })
            .catch( err => {
                this.setState({loading:false});
            });
    }
    
    render(){
        return(
            <div>
                {this.state.orders.map(order =>(
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                        />
                ))}
            </div>    
        );

    }
}

export default withErrorHanler(Orders, axios);
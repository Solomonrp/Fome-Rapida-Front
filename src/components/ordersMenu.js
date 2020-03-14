import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../components/nav';
import Food from '../components/food';
import querySearch from 'stringquery';

export const Order = (props) => {

  const [orders, setOrders] = useState('');

  
  useEffect(() => {
    getOrders();
  }, [])

  const getOrders = async () => {
    const id = localStorage.getItem("id");
    try {
      const orders = await axios.post(`${process.env.REACT_APP_BACK_END}/paidorders`, id);
      console.log('pedidos',orders.data);
      setOrders(orders.data);
    } catch (error) {
      console.log(error)
    }
  }

  // Order.map((pedidos, index) => {
  //   pedidos.map((pedido, index) => {
  //     return 
  //   })
  // })

  return (
    <div>
      <Nav/>
      {
        orders &&
        orders.map((pedidos, index) => {
          return <Link to={`/pedidos?pedido=${pedidos._id}`}>{pedidos.date}</Link>
        })
      }
    </div>
  )
}

export default Order;

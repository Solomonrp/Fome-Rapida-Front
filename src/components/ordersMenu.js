import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../components/nav';
import Food from '../components/food';
import querySearch from 'stringquery';
import '../style/orders.css';

export const Order = (props) => {

  const [orders, setOrders] = useState('');


  useEffect(() => {
    getOrders();
  }, [])

  const getOrders = async () => {
    const id = localStorage.getItem("id");
    try {
      const orders = await axios.post(`${process.env.REACT_APP_BACK_END}/paidorders`, id);
      console.log('pedidos', orders.data);
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
      <Nav />
      <div>
        <h1 className="food__tittle">Pedidos Realizados</h1>
      </div>
      <div className="orders_wrapper">
        <a className="orders_food"> Realizado | Status</a>
        {
          orders &&
          orders.map((pedidos, index) => {
            return <Link className="orders_food" to={`/pedidos?pedido=${pedidos._id}`}>
              {pedidos.date.split('T')[0]} |
            {
                pedidos.concluido &&
                <span>Concluido</span>
              }</Link>
          })
        }
      </div>
    </div>
  )
}

export default Order;

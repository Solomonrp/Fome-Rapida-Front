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
    props.checkStatus();
  }, [])

  const getOrders = async () => {
    const id = {
      id: localStorage.getItem("id")
    };
    try {
      const orders = await axios.post(`${process.env.REACT_APP_BACK_END}/paidorders`, id);
      console.log('pedidos', orders.data);
      setOrders(orders.data);
    } catch (error) {
      console.log(error)
    }
  }

  const changeStatus = (id) => {
    document.getElementById(5).children[0].innerText = "teste"
  }

  // Order.map((pedidos, index) => {
  //   pedidos.map((pedido, index) => {
  //     return 
  //   })
  // })

  const teste = {
    order: [{
      type: "food",
      id: 0,
      quantity: 1,
      _id: "5e79763fe6551066130ffc24",
      name: "Mussarela",
      price: "15",
      time: "29:24",
      category: "Pizza",
      status: "concluido"
    }],
    concluido: false,
    ItensConcluidos: 1,
    statusPedido: "concluido",
    mesa: "undefined",
    pago: false,
    pagamento: [],
    _id: "5e7ab306bc00981007e811aa",
    clientId: "5e570fc9dd4ac059d8b4007c",
    numberOrder: 6,
    tempoTotalInicial: "30:00",
    tempoTotalRestante: "29:24",
    date: "2020-03-25T01:25:26.563Z",
  }

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
            return <Link id={pedidos.numberOrder} className="orders_food" to={`/pedidos?pedido=${pedidos._id}`}>
              {pedidos.numberOrder} ||
              {pedidos.date.split('T')[0]} ||
            {
                pedidos.statusPedido &&
                <span>{pedidos.statusPedido}</span>
              }</Link>
          })
        }
      </div>
    </div>
  )
}

export default Order;

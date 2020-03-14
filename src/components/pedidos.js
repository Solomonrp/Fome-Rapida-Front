import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import '../style/category.css';
import Food from '../components/food';
import Nav from './nav';
import querySearch from 'stringquery';

export const Pedidos = (props) => {

  const [pedido, setPedido ] = useState([props.state.cart]);
  const [pedidoId, setPedidoId] = useState([]);

  useEffect(() => {
    getData();
  },[])

  // if(props.state.cart){
  //   setPedido(props.state.cart);
  // }

  const getData = async () => {
    let foodId = querySearch(window.location.search);
    try {
      const data = await axios.post(`${process.env.REACT_APP_BACK_END}/findfood`, foodId);
      console.log(data.data)
      setPedidoId(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
    <Nav />
    <div>
      {
        pedidoId ?
        pedidoId.map((comidas, index) => {
          return comidas.order.map((comida, index) =>{
            return <Food quantity={comida.quantity} img={comida.img} name={comida.name} time={comida.time} key={index} />
          })
        })
        : props.state.cart ?
        props.state.cart.map((food, index) => {
          return <Food quantity={food.quantity} idCart={index} img={food.img} name={food.name} time={food.time} key={index} />
        })
        :
<<<<<<< HEAD
        <span>Não temos nenhum pedido para exibir</span>
=======
        <a>Não temos nenhum pedido para exibir</a>
>>>>>>> c6b1483c1935b949162ef5b3278d7cfbb54879c4
      }
    </div>
  </React.Fragment>
  )
}

export default Pedidos;

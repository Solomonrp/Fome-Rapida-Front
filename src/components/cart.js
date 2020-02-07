import React, { Component } from 'react';
import '../style/cart.css';
import Abtn from '../style/styled/btn_ball';
import cart from  '../style/img/icons/cart.png';

class Cart extends Component {
  render() {
    return (
      <div className="cart__wrapper">
        <div>
          <img src={cart} className="nav_car_img" />
        </div>
        <Abtn>+</Abtn>
        <div>
          <a>R$ 100,00</a>
        </div>

      </div>
    )
  }
}

export default Cart;
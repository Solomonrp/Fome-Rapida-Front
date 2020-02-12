import React, { Component } from 'react';
import '../style/cart.css';
import Abtn from '../style/styled/btn_ball';
import cart from  '../style/img/icons/cart.png';

class Cart extends Component {

  state = {
    marg: 20,
    oldMarg: 20
  }

  cartRef = React.createRef();

  handleCart = () => {
    const cart = this.cartRef.current;
    console.log(cart.getBoundingClientRect());
    console.log(cart.getBoundingClientRect().height);
    console.log(getComputedStyle(cart).marginBottom);
    // const value = -40;
    // cart.style.margin = `0px 0px ${value}px 0px` ;
    cart.classList.toggle('cart__opened');
    this.setState({
      marg: 0
    })
    console.log(cart.classList[1])
    if(cart.classList[1]){
      this.setState({
        marg: this.state.oldMarg
      })
    }
  }

  handleClick = () => {
    const cart = this.cartRef.current;
    console.log(cart.getBoundingClientRect());
    console.log(cart.getBoundingClientRect().height);
    console.log(cart.style.color);


    const value = this.state.oldMarg + 20;
    this.setState({
      marg: value,
      oldMarg: value
    })
    // cart.style.margin = `0px 0px ${value}px 0px` ;

  }

  render() {
    const styles = {
      "margin-bottom": "0px"
    }

    const styleWrapper = {
      "margin": `0px 0px -${this.state.marg}px 0px`
    }

    return (
      <div ref={this.cartRef} className="cart__wrapper" style={styleWrapper}>
        <div>
          <img src={cart} className="nav_car_img" />
        </div>
        <Abtn onClick={() => this.handleClick()} >+</Abtn>
        <Abtn onClick={() => this.handleCart()} >+</Abtn>
        <div>
          <a>R$ 100,00</a>
        </div>
        <div className="cart__closed">
          <div>Teste</div>
          <div>Teste</div>
          <div>Teste</div>
        </div>
      </div>
    )
  }
}

export default Cart;
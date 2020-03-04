import React, { Component } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import '../style/cart.css';
import Abtn from '../style/styled/btn_ball';
import cart from '../style/img/icons/cart.png';

class Cart extends Component {

  state = {
    marg: this.props.cartSize,
    oldMarg: 0,
    price: 0,
    step: false,
  }

  cartRef = React.createRef();

  
  componentDidUpdate(prevState, prevProps) {
    // console.log(prevState.cart)
    // console.log(prevState.cart[0].price)
    // console.log(prevProps.marg)
    // console.log(this.props.cartSize)
    if(prevProps.marg !== this.props.cartSize) {
      this.setState({
        marg: this.props.cartSize,
        oldMarg: prevProps.marg
      })
      this.handleTeste()
    }
  }
  
  handleTeste = () => {
    // console.log('cart',this.props.cart)
    const array = this.props.cart.map( item => {
      return item.price;
    })
    console.log('priceeee',array);
    const price = array.reduce((acc, total) => {
      console.log('accPrice',acc)
      console.log('total',total)
      return acc + total;
    })
    console.log('price',price)
    this.setState({
      price: price
    })
  }

  handleCart = () => {
    // const cart = this.cartRef.current;
    // console.log(cart.getBoundingClientRect());
    // console.log(cart.getBoundingClientRect().height);
    // console.log(getComputedStyle(cart).marginBottom);
    // // const value = -40;
    // // cart.style.margin = `0px 0px ${value}px 0px` ;
    // cart.classList.toggle('cart__opened');
    // this.setState({
    //   marg: 0
    // })
    // console.log(cart.classList[1])
    // if (cart.classList[1]) {
    //   this.setState({
    //     marg: this.state.oldMarg        
    //   })
    // }
    if (!this.state.step) {
    this.setState({
      step: true
    })
  } else {
    this.setState({
      step: false
    })
  }

  }

  handleClick = () => {
    const cart = this.cartRef.current;
    console.log(cart.getBoundingClientRect());
    console.log(cart.getBoundingClientRect().height);
    console.log(cart.style.color);


    // const value = this.state.oldMarg + 20;
    this.setState({
      // marg: value,
      // oldMarg: value
      step: true
    })
    // cart.style.margin = `0px 0px ${value}px 0px` ;

  }

  render() {
    const styles = {
      // "margin-bottom": "0px"
    }

    const styleWrapper = {
      // "margin": `0px 0px -${this.state.marg * 20}px 0px`
    }

    const itemStyle = {
      // "padding" : "0.8px"
    }

    const transitionOptions = {
      transitionName: "fade",
      // mountOnEnter: 500,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
      
    }

    return (
      <div ref={this.cartRef} className="cart__wrapper" style={styleWrapper}>
        <div>
          <img src={cart} className="nav_car_img" />
        </div>
        <Abtn onClick={() => this.handleCart()} >+</Abtn>
        <div>
          <a>R$ {this.state.price},00</a>
        </div>
        <div className="cart__closed">
          <ReactCSSTransitionGroup {...transitionOptions}> 
          {
            this.state.step &&
              this.props.cart.map((item, index) => {
                return <div style={itemStyle} key={index}>{item.name} R${item.price},00</div>
              })
          }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default Cart;
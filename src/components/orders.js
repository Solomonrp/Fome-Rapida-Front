import React, { Component } from 'react';
import Nav from '../components/nav';
import Food from '../components/food';
import Cart from '../components/cart';

class Orders extends Component {

  componentDidMount(){
    // this.props.background(100);
    // this.props.handleCartChange(1,5,5);
    document.body.classList.add('orderBack');

  }

  changeCart = (id, quantity, price) => {
    this.props.handleCartChange(id, quantity, price);
    this.props.handlePrice();
  }

  componentWillUnmount() {
    document.body.classList.remove('orderBack');
  }

  render() {
    return (
      <React.Fragment>
        <Nav />
        <div>
          {
            this.props.orders &&
            this.props.orders.map((food, index) => {
              // {...food}
              return <Food quantity={food.quantity} changeCart={this.changeCart} idCart={index} category={food.category} img={food.img} name={food.name} price={food.price} time={food.time} key={index} />
            })
          }
          {/* <Food type='cart' /> */}
          {/* <Food type='cart' /> */}
        </div>
        <Cart sendOrder={this.props.sendOrder} state={this.props.state} orders={this.props.orders}/>
      </React.Fragment>
    )
  }
}

export default Orders;
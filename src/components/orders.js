import React, { Component } from 'react';
import Nav from '../components/nav';
import Food from '../components/food';
import Cart from '../components/cart';

class Orders extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          {
            this.props.orders &&
            this.props.orders.map((food, index) => {
              return <Food type='food' id={index} {...food} />
            })
          }
          {/* <Food type='cart' /> */}
          {/* <Food type='cart' /> */}
        </div>
      </React.Fragment>
    )
  }
}

export default Orders;
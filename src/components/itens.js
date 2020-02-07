import React, { Component } from 'react';
import Food from '../components/food';
import Nav from '../components/nav';
import Cart from '../components/cart';

class Itens extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Food type='food' handleCart={this.props.cartHandler}/>
          <Food type='food' handleCart={this.props.cartHandler}/>
        </div>
      </React.Fragment>
    )
  }
}

export default Itens;
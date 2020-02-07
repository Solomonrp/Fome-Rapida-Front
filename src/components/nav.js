import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css';
import cart from  '../style/img/icons/cart.png';

class Nav extends Component {
  
  handleSide() {
    
  }
  
  render() {
    return (
      <div className="nav__wrapper">
        <div>
          <div className="nav_line"></div>
          <div className="nav_line"></div>
          <div className="nav_line"></div>
        </div>
        <Link to={`/orders`}>
          <img src={cart} className="nav_car_img"/>
        </Link>
      </div>
    )
  }
}

export default Nav;
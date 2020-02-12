import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css';
import cart from '../style/img/icons/cart.png';

class Nav extends Component {

  nav_wrapperRef = React.createRef();
  burguer = React.createRef();

  handleSide = () => {
    const nav = this.nav_wrapperRef.current;
    const burguer = this.burguer.current;
    nav.classList.toggle('is_nav_open');
    burguer.classList.toggle('is_burguer_side');
  }

  render() {
    return (
      <div  className="nav__wrapper">

        <ul ref={this.nav_wrapperRef} className="nav__list">
          <li><Link to={`/category`} onClick={()=> this.handleSide()} >Categorias</Link></li>
          <li><Link to={`/orders`} onClick={()=> this.handleSide()}>Pedidos</Link></li>
        </ul>

      <div ref={this.burguer} className="nav__wrapper_icons">

        <div className="nav__burguer"  onClick={()=> this.handleSide()}>
          <div className="nav_line"></div>
          <div className="nav_line"></div>
          <div className="nav_line"></div>
        </div>

        <Link to={`/orders`}>
          <img src={cart} className="nav_car_img" />
        </Link>
      </div>
      </div>
    )
  }
}

export default Nav;
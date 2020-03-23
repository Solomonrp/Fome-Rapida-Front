import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/nav.css';
import cart from '../style/img/icons/supermarket.png';

class Nav extends Component {

  componentDidMount() {
    console.log('cartttt', this.props)
    // const sizeHeigth = document.body.scrollHeight;
    // const windowHeigth = window.innerHeight;
    // if(sizeHeigth > windowHeigth) {
    //   document.querySelectorAll('.nav__list')[0].setAttribute('style', `height: ${sizeHeigth}px`)
    // } else {
    //   document.querySelectorAll('.nav__list')[0].setAttribute('style', `height: ${windowHeigth}px`)
    // }
  }

  componentDidUpdate(prevState, prevProps) {
    console.log('prevstate', prevState)
    console.log('props', prevProps)
  }

  nav_wrapperRef = React.createRef();
  burguer = React.createRef();

  handleSide = () => {
    const nav = this.nav_wrapperRef.current;
    const burguer = this.burguer.current;
    // nav.classList.toggle('is_nav_open');
    document.body.style.overflow = this.state.show ? "hidden" : "initial";
    burguer.classList.toggle('on', this.state.show);
    console.log(this.state.show)
    this.setState({
      show: !this.state.show
    })
  }

  state = {
    cart: this.props.cart, 
    show: true
  }

  render() {
    return (
      <div className="nav__wrapper">

        <div ref={this.burguer} className="nav__wrapper_icons">
          <div className="nav__burguer" onClick={() => this.handleSide()}>
            <div className="nav_line1"></div>
            <div className="nav_line2"></div>
            <div className="nav_line3"></div>
          </div>

          <nav>
            <ul ref={this.nav_wrapperRef} className="nav__list">
              <li><Link to={`/category`} onClick={() => this.handleSide()} >Categorias</Link></li>
              <li><Link to={`/orders`} onClick={() => this.handleSide()}>Pedidos</Link></li>
              <li><Link to={`/pagos`} onClick={() => this.handleSide()}>Pago</Link></li>
            </ul>
          </nav>

        </div>
          <Link to={`/orders`}>
            {/* {
              this.props.cart > 1 &&
                <span>.</span>
            } */}
            <img src={cart} className="nav_car_img" />
          </Link>
      </div>
    )
  }
}

export default Nav;
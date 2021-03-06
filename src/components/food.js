import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/food.css';
import Pizza from "../style/img/category/foodiesfeed.com_neapolitan-pizza-margherita.jpg";
import Salada from "../style/img/category/salada.jpg";
import Carne from "../style/img/category/carne.jpg";
import Bebida from "../style/img/category/can.jpg";

class Food extends Component {

  componentDidMount() {
    console.log('fooood', this.props)
    // this.props.handleCartChange()
  }

  state = {
    id: 0,
    quantity: 0,
    price: 0,
  }

  handleClickCart = () => {
    this.props.handleCart(this.props);
    // console.log(this.props)
  }

  handlePlusBtn = (event) => {
    let id = event.currentTarget.parentNode.id;
    let quantity = event.currentTarget.nextElementSibling.innerText;
    quantity = Number(quantity) + 1;
    event.currentTarget.nextElementSibling.innerText = quantity;
    let price = parseFloat(document.querySelectorAll('.food__price_wrapper')[id].innerText.slice(3, 90));
    this.props.changeCart(id, quantity, price);
    // this.change(id,quantity,price);
    // console.log(price);
  }

  handleMinusBtn = (event) => {
    let quantity = Number(event.currentTarget.previousSibling.innerText);
    let id = event.currentTarget.parentNode.id;
    let price = parseFloat(document.querySelectorAll('.food__price_wrapper')[id].innerText.slice(3, 90));
    if (quantity === 1) {
      return
    }
    quantity = Number(quantity) - 1;
    event.currentTarget.previousSibling.innerText = quantity;
    this.props.changeCart(id, quantity, price);
  }

  render() {
    return (
      <div className="food" id={this.props.id} category={this.props.name}>
        <div className="food_wrapper">
          <div className="food__img">
            <img className="food__img__food" src={this.props.img} />
          </div>
          <div className="food__data">
            <div className="food__data_desc">
              <span>{this.props.name}</span>
              {
                this.props.type !== 'category' &&
                <div>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
              }
              {
                this.props.type === 'category' && <span>Itens: {this.props.quantityProducts}</span>
              }

            </div>
          </div>
          {
            this.props.type === 'feito' ?
            <div className="food__price_wrapper">
            <span>Realizado</span>
          </div>
            :
            this.props.type !== 'category' && 
            <div className="food__price_wrapper">
              <span>R$ {this.props.price},00</span><br/>
              <span>Tempo: {this.props.time}</span> 
            </div>
          }

          {
            this.props.type === 'category' ?
              <div className="food_desc2_wrapper">
                <Link to={`/category/itens?category=${this.props.name}`} className="food_desc2">></Link>
              </div>
              : this.props.type === 'food' ?
                <div className="food__desc--category">
                  <a className="food_desc food_desc_plus" onClick={this.handleClickCart}>+</a>
                  <Link to={'/orders'} className="food_desc food_desc_plus">></Link>
                </div>
                : this.props.type === 'feito' ?
                  <div id={this.props.idCart} className="food_desc_wrapper food_desc_pedidos">
                    <a className="food_desc food_desc_quantity__pedidos">{this.props.quantity}</a>
                  </div>
                  :
                  <div id={this.props.idCart} className="food_desc_wrapper">
                    <a className="food_desc food_desc_plus" onClick={this.handlePlusBtn}>+</a>
                    <a className="food_desc food_desc_quantity">{this.props.quantity}</a>
                    <a className="food_desc food_desc_minus" onClick={this.handleMinusBtn}>-</a>
                  </div>

          }

        </div>
      </div>
    )
  }
}

export default Food;
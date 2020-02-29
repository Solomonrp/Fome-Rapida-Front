import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/food.css';
import Pizza from "../style/img/category/foodiesfeed.com_neapolitan-pizza-margherita.jpg";

class Food extends Component {

  componentDidMount(){
    console.log(this.props)
    // this.props.handleCartChange()
  }

  state = {
    id: 0,
    quantity: 0,
    price: 0
  }

  handleClickCart = () => {
    this.props.handleCart(this.props);
  }

  handlePlusBtn = (event) => {
    let id = event.currentTarget.parentNode.id;
    let quantity = event.currentTarget.nextElementSibling.innerText;
    event.currentTarget.nextElementSibling.innerText = Number(quantity) + 1;
    let price = parseFloat(document.querySelectorAll('.food__price_wrapper')[id].innerText.slice(8, 90));
    this.props.changeCart(id,quantity,price);
    // this.change(id,quantity,price);
    console.log(price);
  }

  handleMinusBtn = (event) => {
    let quantity = Number(event.currentTarget.previousSibling.innerText);
    console.log(quantity)
    let id = event.currentTarget.parentNode.id;
    console.log(id)
    let price = parseFloat(document.querySelectorAll('.food__price_wrapper')[id].innerText.slice(8, 90))
    console.log(price)
    if (quantity === 1 || price === 100) {
      return
    }
    event.currentTarget.previousSibling.innerText = Number(quantity) - 1;
    this.props.changeCart(id,quantity,price);
  }

  render() {
    return (
      <div className="food" id={this.props.id} category={this.props.category}>
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
                this.props.type === 'category' && <span>Itens: 10</span>
              }
              
            </div>
          </div>
          {
              this.props.type !== 'category' &&
            <div className="food__price_wrapper">
              <span>Price R${this.props.price},00</span>
            </div>
            }

            {
              this.props.type === 'category' ?
                <div className="food_desc2_wrapper">
                  <Link to={`/category/itens?category=${this.props.category}`} className="food_desc2">></Link>
                </div>
                : this.props.type === 'food' ?
                  <div className="food__desc--category">
                    <a className="food_desc food_desc_plus" onClick={this.handleClickCart}>+</a>
                    <Link to={'/orders'} className="food_desc food_desc_plus" onClick={this.handleClickCart}>></Link>
                  </div>
                  :
                  <div id={this.props.idCart} className="food_desc_wrapper">
                    <a className="food_desc food_desc_plus" onClick={this.handlePlusBtn}>+</a>
                    <a className="food_desc food_desc_quantity">1</a>
                    <a className="food_desc food_desc_minus" onClick={this.handleMinusBtn}>-</a>
                  </div>
            }
            
        </div>
      </div>
    )
  }
}

export default Food;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/food.css';
import Pizza from "../style/img/category/foodiesfeed.com_neapolitan-pizza-margherita.jpg";

class Food extends Component {


  handleClickCart = () => {

  }

  handlePlusBtn(event) {
    let quantity = event.currentTarget.nextElementSibling.innerText;
    event.currentTarget.nextElementSibling.innerText = Number(quantity) + 1;
    let price = parseFloat(event.currentTarget.parentNode.nextSibling.firstChild.innerText.slice(8, 90));
    console.log(price);
    event.currentTarget.parentNode.nextSibling.firstChild.innerText = `Price R$${price + 100},00  `
  }

  handleMinusBtn(event) {
    let quantity = Number(event.currentTarget.previousSibling.innerText);
    console.log(quantity)
    let price = parseFloat(event.currentTarget.parentNode.nextSibling.firstChild.innerText.slice(8, 90))
    console.log(price)
    if (quantity === 1 || price === 100) {
      return
    }
    event.currentTarget.previousSibling.innerText = Number(quantity) - 1;
    event.currentTarget.parentNode.nextSibling.firstChild.innerText = `Price R$${price - 100},00  `
  }

  render() {
    return (
      <div className="food">
        <div className="food_wrapper">
          <div className="food__img">
            <img className="food__img__food" src={Pizza} />
          </div>
          <div className="food__data">
            <div className="food__data_desc">
              <span>Pizza</span>
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
              <span>Itens: 10</span>
            </div>
            {
              this.props.type === 'category' ?
                <div>
                  <Link to={`/category/itens`} className="food_desc">></Link>
                </div>
                : this.props.type === 'food' ?
                  <div>
                    <a className="food_desc">+</a>
                  </div>
                  :
                  <div>
                    <a className="food_desc food_desc_plus" onClick={this.handlePlusBtn}>+</a>
                    <a className="food_desc food_desc_quantity">1</a>
                    <a className="food_desc food_desc_minus" onClick={this.handleMinusBtn}>-</a>
                  </div>
            }
            <div>
              <span>Price R$100,00</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Food;
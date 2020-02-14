import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Category from './components/category';
import Itens from './components/itens';
import Orders from './components/orders';
import Nav from './components/nav';
import Cart from './components/cart';
import './App.css';
import './style/home.css'
import testeImg from './style/img/category/foodiesfeed.com_neapolitan-pizza-margherita.jpg'

class App extends Component {

  state = {
    cart: [],
    cartQ: 0,
    valueOrder: 0,
  }

  pizzas = [{
    img: testeImg,
    category: "pizza",
    name: "mussarela",
    price: 100,
    time: "30"
  },{
    img: testeImg,
    category: "pizza",
    name: "pizza2",
    price: 10,
    time: "30"
  },{
    img: testeImg,
    category: "pizza",
    name: "pizza3",
    price: 200,
    time: "30"
  },{
    img: testeImg,
    category: "pizza",
    name: "pizza4",
    price: 60,
    time: "30"
  },{
    img: testeImg,
    category: "pizza2",
    name: "pizza5",
    price: 120,
    time: "30"
  },{
    img: testeImg,
    category: "pizza2",
    name: "pizza6",
    price: 200,
    time: "30"
  },{
    img: testeImg,
    category: "pizza3",
    name: "pizza7",
    price: 900,
    time: "30"
  },{
    img: testeImg,
    category: "pizza3",
    name: "pizza8",
    price: 700,
    time: "30"
  },
]

  handleCart = (value) => {
    let carts = this.state.cart;
    carts.push(value);
    this.setState({
      cart: carts,
      cartQ: carts.length
    })
  }

  render() {
    return (
      <div>
        <div className="App wrapper">
          <Nav cart={this.state.cart} />
          {/* <Home /> */}
          <Switch>
            <Route exact path='/category' render={() => <Category data={this.pizzas}/>} />
            <Route path='/category/itens' render={(props) => <Itens {...props} data={this.pizzas} cartHandler={this.handleCart} />} />
            <Route path='/orders' render={() => <Orders orders={this.state.cart} />} />
            {/* <Route exact path='/' render={() => <Home changeState={this.changeState} api={this.callApi} data={this.state.allPlants} />} /> */}
          </Switch>
          <Cart cart={this.state.cart} cartSize={this.state.cartQ} />
        </div>
      </div>
    );
  }
}

export default App;

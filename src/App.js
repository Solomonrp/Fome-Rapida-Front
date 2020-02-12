import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import './style/home.css'
import Category from './components/category';
import Itens from './components/itens';
import Orders from './components/orders';
import Nav from './components/nav';
import Cart from './components/cart';

class App extends Component {

  state = {
    cart: [],
    valueOrder: 0,
  }

  pizza = {
    name : "mussarela",
    price: "100",
    
  }

  handleCart (value) {
    let carts = this.state.cart;
    carts.push(value);
    this.setState({
      cart: carts
    })
  }

  render() {
    return (
      <div className="App wrapper">
          <Nav />
        {/* <Home /> */}
        <Switch>
          <Route exact path='/category' render={() => <Category />} />
          <Route path='/category/itens' render={() => <Itens cartHandler={this.handleCart} />} />
          <Route path='/orders' render={() => <Orders orders={this.state.cart}/>} />
          {/* <Route exact path='/' render={() => <Home changeState={this.changeState} api={this.callApi} data={this.state.allPlants} />} /> */}
        </Switch>
        <Cart cart={this.state.cart} />
  
      </div>
    );
  }
}

export default App;

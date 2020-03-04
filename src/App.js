import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Category from './components/category';
import Itens from './components/itens';
import Orders from './components/orders';
import Nav from './components/nav';
import Cart from './components/cart';
import Login from './components/login';
import Login2 from './components/login2';
import './App.css';
import './style/home.css'
import testeImg from './style/img/category/foodiesfeed.com_neapolitan-pizza-margherita.jpg'

class App extends Component {

  state = {
    cart: [],
    price: 0,
    quantity: 0,
    cartQ: 0,
    valueOrder: 0,
    email: '',
    password: '',
    endpoint: 'http://localhost:5005/',
    socket: socketIOClient(`http://localhost:5000/`),
    background: 33,
    response: ''
  }

  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    const socket = this.state.socket;
    // this.state.socket.on('up', data => this.setState({ response: data }));
    socket.on('up', data => console.log('hello', data));
  }

  handleState = (value, state) => {
    this.setState({
      [value]: state
    })
  }

  pizzas = [{
    img: testeImg,
    category: "pizza",
    name: "mussarela",
    price: 100,
    quantity: 1,
    time: "30"
  }, {
    img: testeImg,
    category: "pizza",
    name: "pizza2",
    price: 10,
    quantity: 1,
    time: "30"
  }, {
    img: testeImg,
    category: "pizza",
    name: "pizza3",
    price: 200,
    quantity: 1,
    time: "30"
  }, {
    img: testeImg,
    category: "pizza",
    name: "pizza4",
    price: 60,
    quantity: 1,
    time: "30"
  }, {
    img: testeImg,
    category: "pizza2",
    name: "pizza5",
    price: 120,
    quantity: 1,
    time: "30"
  }, {
    img: testeImg,
    category: "pizza2",
    name: "pizza6",
    price: 200,
    quantity: 1,
    time: "30"
  }, {
    img: testeImg,
    category: "pizza3",
    name: "pizza7",
    price: 900,
    quantity: 1,
    time: "30"
  }, {
    img: testeImg,
    category: "pizza3",
    name: "pizza8",
    price: 700,
    quantity: 1,
    time: "30"
  },
  ]

  handleCart = (value) => {
    let carts = this.state.cart;
    carts.push(value);
    const array = carts.map( item => {
      return item.price * item.quantity;
    })
    const price = array.reduce((acc, total) => {
      return acc + total;
    })
    const quanti = carts.map( quant => {
      return quant.quantity
    })
    const quantity = quanti.reduce((acu, sum) => {
      return acu + sum
    })
    this.setState({
      cart: carts,
      price: price,
      quantity: quantity,
      cartQ: carts.length
    })
  }
  
  sendOrder = () => {
    this.state.socket.emit("cart", this.state.cart);
    this.state.socket.on('order', data => console.log('hello', data));
  }

  handlePrice = () => {
    let carts = this.state.cart;
    const array = carts.map( item => {
      return item.price * item.quantity;
    })
    const price = array.reduce((acc, total) => {
      return acc + total;
    })
    const quanti = carts.map( quant => {
      return quant.quantity
    })
    const quantity = quanti.reduce((acu, sum) => {
      return acu + sum
    })
    this.setState({
      price: price,
      quantity: quantity,
    })
  }

  handleBackground = (value) => {
    this.setState({
      background: value
    })
  }

  handleCartChange = (position, quantit, price) => {
    let carts = this.state.cart;
    console.log('Não alterado', carts);
    carts[position] = {
      type: carts[position].type,
      id: carts[position].id,
      img: carts[position].img,
      category: carts[position].category,
      name: carts[position].name,
      price: price,
      quantity: quantit,
      time: carts[position].time,
      handleCart: carts[position].handleCart
    };
    console.log('alterado', carts)
  }

  render() {
    const background = {
      // 'background': `linear-gradient(90deg, red ${this.state.background}%, white 33%)`,
      // 'height': '100vh'
    }
    return (
      <div>
        <div className="App" style={background}>
          {/* <Home /> */}
          {/* <Nav cart={this.state.cart} /> */}
          <Switch>
            <Route exact path='/' render={() => <Login2 state={this.state} handleState={this.handleState} />} />
            <Route exact path='/category' render={() => <Category background={this.handleBackground} data={this.pizzas} />} />
            <Route path='/category/itens' render={(props) => <Itens {...props} data={this.pizzas} background={this.handleBackground} cartHandler={this.handleCart} />} />
            <Route path='/orders' render={() => <Orders sendOrder={this.sendOrder} handlePrice={this.handlePrice} handleCartChange={this.handleCartChange} state={this.state} background={this.handleBackground} orders={this.state.cart} />} />
            {/* <Route exact path='/' render={() => <Home changeState={this.changeState} api={this.callApi} data={this.state.allPlants} />} /> */}
          </Switch>
          {/* <Cart cart={this.state.cart} cartSize={this.state.cartQ} /> */}
        </div>
      </div>
    );
  }
}

export default App;

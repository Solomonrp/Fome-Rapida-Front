import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import AppContext from "../src/context/AppContext";
import './App.css';
import './style/home.css';
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
import Kitchen from './components/Kitchen/Dashboard';
import Admin from './components/Kitchen/Admin';

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
    response: '',
    realizando: [{ numPedido: 50, mesa: 10, item: "teste", quantidade: 50 }, { numPedido: 70, mesa: 15, item: "teste", quantidade: 80 }, { numPedido: 90, mesa: 18, item: "teste", quantidade: 90 }, { numPedido: 49, mesa: 50, item: "teste", quantidade: 500 }],
    pedidos: [
      {
        numPedido: 50,
        mesa: 10,
        itens: [{ product: "teste", quantidade: 50, tempo: "1:15", tempoRestante: "1:15", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "1:15", tempoRestante: "1:15", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "0:05", tempoRestante: "0:05", status: 'realizando' }],
        ItensConcluidos: 0,
        statusPedido: 'realizado',
        tempoTotalInicial: '1:15',
        tempoTotalRestante: '1:15',
      },

      {
        numPedido: 56,
        mesa: 19,
        itens: [{ product: "teste", quantidade: 80, tempo: "0:03", tempoRestante: "0:03", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "0:09", tempoRestante: "0:09", status: 'realizando' }],
        ItensConcluidos: 0,
        statusPedido: 'realizado',
        tempoTotalInicial: '0:09',
        tempoTotalRestante: '0:09',
      }],
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
    const array = carts.map(item => {
      return item.price * item.quantity;
    })
    const price = array.reduce((acc, total) => {
      return acc + total;
    })
    const quanti = carts.map(quant => {
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
    const array = carts.map(item => {
      return item.price * item.quantity;
    })
    const price = array.reduce((acc, total) => {
      return acc + total;
    })
    const quanti = carts.map(quant => {
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

  alterStateTempoRestante = (tipo, pedido, item, tempo) => {
    const state = { ...this.state };
    switch (tipo) {
      case 'item':
        state.pedidos[pedido].itens[item].tempoRestante = tempo.join(':');
        break;
      case 'pedido':
        state.pedidos[pedido].tempoTotalRestante = tempo.join(':');
        break;
      default:
        console.log('deu muito ruim')
    }
    this.setState(state);
  }

  alterStateAtrasado = (tipo, pedido, item) => {
    const state = { ...this.state };
    switch (tipo) {
      case 'item':
        state.pedidos[pedido].itens[item].status = 'atrasado';
        break;
      case 'pedido':
        state.pedidos[pedido].statusPedido = 'atrasado';
        break;
      default:
        console.log('Deu muito ruim cara ;_:');
    }
    this.setState(state);
  }

  alterStateConcluido = (Indexpedido, item) => {
    const state = { ...this.state };

    state.pedidos[Indexpedido].itens[item].status = 'concluido';

    if (state.pedidos[Indexpedido].ItensConcluidos === 0) {
      state.pedidos[Indexpedido].ItensConcluidos = 1;
      this.setState(state);
    } else {
      state.pedidos[Indexpedido].ItensConcluidos = state.pedidos[Indexpedido].ItensConcluidos + 1;
      this.setState(state);
    }
    this.verifyStatus(Indexpedido);
  }

  verifyStatus = (Indexpedido) => {

    if (this.state.pedidos[Indexpedido].itens.length === this.state.pedidos[Indexpedido].ItensConcluidos) {
      this.state.pedidos[Indexpedido].statusPedido = 'concluido';
    }

  }

  counterLis = () => {
    let cardActiveTablesCounter = document.querySelectorAll('div.cards.active-tables > div.list > ul > li').length;
    let cardRightCounter = document.querySelectorAll('div.cards.right > div.list > ul > li').length;
    let cardLateCounter = document.querySelectorAll('div.cards.late > div.list > ul > li').length;
    let cardCompletedCounter = document.querySelectorAll('div.cards.completed > div.list > ul > li').length;

    let cardActiveTablesElement = document.querySelector("#root > div > section > div.cards.active-tables > div.title > h3:nth-child(2)");
    let cardRightElement = document.querySelector("#root > div > section > div.cards.right > div.title > h3:nth-child(2)");
    let cardLateElement = document.querySelector("#root > div > section > div.cards.late > div.title > h3:nth-child(2)");
    let cardCompletedElement = document.querySelector("#root > div > section > div.cards.completed > div.title > h3:nth-child(2)");

    cardActiveTablesElement.innerText = cardActiveTablesCounter;
    cardRightElement.innerHTML = cardRightCounter;
    cardLateElement.innerHTML = cardLateCounter;
    cardCompletedElement.innerHTML = cardCompletedCounter;
  }

  render() {
    const contextValues = {
      state: this.state,
      alterStateAtrasado: this.alterStateAtrasado,
      alterStateConcluido: this.alterStateConcluido,
      alterStateTempoRestante: this.alterStateTempoRestante,
      counterLis: this.counterLis
    }

    return (
      <div className="App" style={background}>
        <AppContext.Provider value={contextValues}>
          {/* <Home /> */}
          {/* <Nav cart={this.state.cart} /> */}
          <Switch>

            <Route exact path='/' render={() => <Login2 state={this.state} handleState={this.handleState} />} />
            <Route exact path='/category' render={() => <Category background={this.handleBackground} data={this.pizzas} />} />
            <Route path='/category/itens' render={(props) => <Itens {...props} data={this.pizzas} background={this.handleBackground} cartHandler={this.handleCart} />} />
            <Route path='/orders' render={() => <Orders sendOrder={this.sendOrder} handlePrice={this.handlePrice} handleCartChange={this.handleCartChange} state={this.state} background={this.handleBackground} orders={this.state.cart} />} />
            <Route exact path='/Kitchen' component={Kitchen} />
            <Route exact path='/Kitchen/admin' component={Admin} />
            {/* <Route exact path='/' render={() => <Home changeState={this.changeState} api={this.callApi} data={this.state.allPlants} />} /> */}
          </Switch>
          {/* <Cart cart={this.state.cart} cartSize={this.state.cartQ} /> */}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;

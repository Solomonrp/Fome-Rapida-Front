import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import AppContext from "../src/context/AppContext";
import './App.css';
import './style/home.css';
import Category from './components/category';
import Itens from './components/itens';
import Orders from './components/orders';
import { Pedidos } from './components/pedidos';
import Login2 from './components/login2';
import './App.css';
import './style/home.css'
import testeImg from './style/img/category/foodiesfeed.com_neapolitan-pizza-margherita.jpg'
import Kitchen from './components/Kitchen/Dashboard';
import Payment from './components/payment';
import Order from './components/ordersMenu'
import pagarme from 'pagarme/browser';
import Admin from './components/Kitchen/Admin';

class App extends Component {

  state = {
    cart: [],
    stage: 'buying',
    price: 0,
    quantity: 0,
    cartQ: 0,
    valueOrder: 0,
    email: '',
    password: '',
    endpoint: 'http://localhost:5005/',
    socket: socketIOClient(process.env.REACT_APP_BACK_END),
    background: 33,
    response: '',
    table: 'bancada',
  }

  componentDidMount() {
    const socket = this.state.socket;
    socket.on('up', data => console.log('hello', data));
  }

  handleState = (value, state) => {
    this.setState({
      [value]: state
    })
  }

  handlePay = () => {
    pagarme.client.connect({ api_key: 'ak_test_VXhFAuI7HLxrh44uOJcAvlx3FkX5sf' })
      .then(client => client.transactions.create({
        "amount": 21000,
        "card_number": "4111111111111111",
        "card_cvv": "123",
        "card_expiration_date": "0922",
        "card_holder_name": "Morpheus Fishburne",
        "customer": {
          "external_id": "#3311",
          "name": "Morpheus Fishburne",
          "type": "individual",
          "country": "br",
          "email": "mopheus@nabucodonozor.com",
          "documents": [
            {
              "type": "cpf",
              "number": "30621143049"
            }
          ],
          "phone_numbers": ["+5511999998888", "+5511888889999"],
          "birthday": "1965-01-01"
        },
        "billing": {
          "name": "Trinity Moss",
          "address": {
            "country": "br",
            "state": "sp",
            "city": "Cotia",
            "neighborhood": "Rio Cotia",
            "street": "Rua Matrix",
            "street_number": "9999",
            "zipcode": "06714360"
          }
        },
        "shipping": {
          "name": "Neo Reeves",
          "fee": 1000,
          "delivery_date": "2000-12-21",
          "expedited": true,
          "address": {
            "country": "br",
            "state": "sp",
            "city": "Cotia",
            "neighborhood": "Rio Cotia",
            "street": "Rua Matrix",
            "street_number": "9999",
            "zipcode": "06714360"
          }
        },
        "items": [
          {
            "id": "r123",
            "title": "Red pill",
            "unit_price": 10000,
            "quantity": 1,
            "tangible": true
          },
          {
            "id": "b123",
            "title": "Blue pill",
            "unit_price": 10000,
            "quantity": 1,
            "tangible": true
          }
        ]
      }))
      .then(transaction => console.log(transaction))
  }
  pizzas = [{
    img: testeImg,
    category: "pizza",
    name: "mussarela",
    price: 100,
    quantity: 1,
    time: "0:10"
  }, {
    img: testeImg,
    category: "pizza",
    name: "pizza2",
    price: 10,
    quantity: 1,
    time: "0:10"
  }, {
    img: testeImg,
    category: "pizza",
    name: "pizza3",
    price: 200,
    quantity: 1,
    time: "0:10"
  }, {
    img: testeImg,
    category: "pizza",
    name: "pizza4",
    price: 60,
    quantity: 1,
    time: "0:10"
  }, {
    img: testeImg,
    category: "pizza2",
    name: "pizza5",
    price: 120,
    quantity: 1,
    time: "0:10"
  }, {
    img: testeImg,
    category: "pizza2",
    name: "pizza6",
    price: 200,
    quantity: 1,
    time: "0:10"
  }, {
    img: testeImg,
    category: "pizza3",
    name: "pizza7",
    price: 900,
    quantity: 1,
    time: "0:30"
  }, {
    img: testeImg,
    category: "pizza3",
    name: "pizza8",
    price: 700,
    quantity: 1,
    time: "0:30"
  },
  ]


  handleCart = (value) => {
    console.log(`cart` ,value);
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
      cartQ: carts.length,

    })
  }

  sendOrder = () => {
    let mesa = localStorage.getItem("table");
    console.log(mesa)
    let shop = {
      id: localStorage.getItem("id"),
      cart: this.state.cart,
      mesa: localStorage.getItem("table")
    }
    this.state.socket.emit("cart", shop);
    this.state.socket.on('orders', data => {
      console.log('helloooooooooo', data)
      localStorage.setItem("orderId", data._id);
    });
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
    localStorage.setItem("cart", carts)
    console.log('alterado', carts)
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

  handleStage = () => {
    this.setState({
      stage: "pago"
    })
  }


  render() {
    const background = {
      
    }
    const contextValues = {
      state: this.state,
      counterLis: this.counterLis,
    }

    return (
      <div className="App" style={background}>
        <AppContext.Provider value={contextValues}>
          {/* <Home /> */}
          {/* <Nav cart={this.state.cart} /> */}
          <Switch>
            <Route exact path='/' render={() => <Login2 state={this.state} handleState={this.handleState} />} />
            <Route exact path='/category' render={() => <Category socket={this.state.socket} background={this.handleBackground} data={this.pizzas} />} />
            <Route path='/category/itens' render={(props) => <Itens {...props} data={this.pizzas} background={this.handleBackground} cartHandler={this.handleCart} />} />
            <Route path='/orders' render={() => <Orders handlePay={this.handlePay} sendOrder={this.sendOrder} handlePrice={this.handlePrice} handleCartChange={this.handleCartChange} state={this.state} background={this.handleBackground} orders={this.state.cart} />} />
            <Route path='/pagamento' render={() => <Payment sendOrder={this.sendOrder} handlePay={this.handlePay} handleStage={this.handleStage} state={this.state} />} />
            <Route path='/pagos' render={()=> <Order />} /> 
            <Route path='/pedidos' render={() => <Pedidos state={this.state.cart} />} />
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

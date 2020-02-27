import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppContext from "../src/context/AppContext";
import './App.css';
import './style/home.css';
import Category from './components/category';
import Itens from './components/itens';
import Orders from './components/orders';
import Nav from './components/nav';
import Cart from './components/cart';
import Kitchen from './components/Kitchen/Dashboard';

class App extends Component {

  state = {
    cart: [],
    realizando: [{ numPedido: 50, mesa: 10, item: "teste", quantidade: 50 }, { numPedido: 70, mesa: 15, item: "teste", quantidade: 80 }, { numPedido: 90, mesa: 18, item: "teste", quantidade: 90 }, { numPedido: 49, mesa: 50, item: "teste", quantidade: 500 }],
    pedidos: [
      {
        numPedido: 50,
        mesa: 10,
        itens: [{ product: "teste", quantidade: 50, tempo: "1:15", tempoRestante: "1:15", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "1:15", tempoRestante: "1:15", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "0:05", tempoRestante: "0:05", status: 'realizando' }],
        ItensConcluidos: 0,
        statusPedido: 'realizado',
      },

      {
        numPedido: 56,
        mesa: 19,
        itens: [{ product: "teste", quantidade: 80, tempo: "0:03", tempoRestante: "0:03", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "0:09", tempoRestante: "0:09", status: 'realizando' }],
        ItensConcluidos: 0,
        statusPedido: 'realizado',
      }],
  }

  handleCart(value) {
    let carts = this.state.cart;
    carts.push(value);
    this.setState({
      cart: carts
    })
  }

  alterStateTempoRestante = (pedido, item, tempo) => {
    const state = { ...this.state };
    state.pedidos[pedido].itens[item].tempoRestante = tempo.join(':');
    this.setState(state);
  }

  alterStateAtrasado = (pedido, item) => {
    const state = { ...this.state };
    state.pedidos[pedido].itens[item].status = 'atrasado';
    state.pedidos[pedido].statusPedido = 'atrasado';
    this.setState(state);
  }

  alterStateConcluido = (Indexpedido, item) => {
    const state = { ...this.state };

      state.pedidos[Indexpedido].itens[item].status = 'concluido';
      state.pedidos[Indexpedido].statusPedido = 'realizado';
      if (state.pedidos[Indexpedido].ItensConcluidos === 0) {
        state.pedidos[Indexpedido].ItensConcluidos = 1;
        this.setState(state);
      } else {
        state.pedidos[Indexpedido].ItensConcluidos = state.pedidos[Indexpedido].ItensConcluidos + 1;
        this.setState(state);
      }
      this.verifyStatus(Indexpedido, item);
  }

  verifyStatus = (Indexpedido, item) => {
    if (this.state.pedidos[Indexpedido].itens.length === this.state.pedidos[Indexpedido].ItensConcluidos) {
      this.state.pedidos[Indexpedido].statusPedido = 'concluido';
    }
  }

  render() {
    const contextValues = {
      state: this.state,
      alterStateAtrasado: this.alterStateAtrasado,
      alterStateConcluido: this.alterStateConcluido,
      alterStateTempoRestante: this.alterStateTempoRestante,
    }

    return (
      <div className="App wrapper">
        <AppContext.Provider value={contextValues}>
          {/* <Nav /> */}
          {/* <Home /> */}
          <Switch>
            <Route exact path='/category' render={() => <Category />} />
            <Route path='/category/itens' render={() => <Itens cartHandler={this.handleCart} />} />
            <Route path='/orders' render={() => <Orders orders={this.state.cart} />} />
            <Route exact path='/Kitchen' component={Kitchen} />
            {/* <Route exact path='/' render={() => <Home changeState={this.changeState} api={this.callApi} data={this.state.allPlants} />} /> */}
          </Switch>
          {/* <Cart /> */}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;

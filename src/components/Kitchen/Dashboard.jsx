import React, { Component } from 'react';
import './styles.css';
import AppContext from "../../context/AppContext";
import PedidoRealizado from "../Kitchen/PedidoRealizado";
import axios from 'axios';

export default class Kitchen extends Component {

    state = {
        orders: [],
        tables: []
    }

    componentDidMount() {
        this.context.counterLis();
        const socket = this.context.state.socket;
        socket.on('orders', orders => {
            let order = this.state.orders;
            order.push(orders);
            this.setState({
                orders: order
            });
        });
        socket.on('table', table => {
            console.log(table);
            this.state.tables.push(table);
        })
        socket.on('offline', userOff => {
            // this.setState({
            //     tables: [userOff]
            // })
            console.log('sesssao do user foi encerrada', userOff);
        })
    }

    alterStateTempoRestante = (tipo, pedido, item, tempo) => {
        const state = { ...this.state };
        switch (tipo) {
            case 'item':
                state.orders[pedido].order[item].time = tempo.join(':');
                break;
            case 'pedido':
                state.orders[pedido].tempoTotalRestante = tempo.join(':');
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
                state.orders[pedido].order[item].status = 'atrasado';
                break;
            case 'pedido':
                state.orders[pedido].statusPedido = 'atrasado';
                axios.put(`${process.env.REACT_APP_BACK_END}/update-order`, state.orders[pedido])
                    .then((res) => {
                        // this.context.state.socket.emit('orderLate', res);
                    })
                    .catch((err) => {
                        console.log('front erros', err)
                    })
                break;
            default:
                console.log('Deu muito ruim cara ;_:');
        }
        this.setState(state);
    }

    alterStateConcluido = (Indexpedido, item) => {
        const state = { ...this.state };

        state.orders[Indexpedido].order[item].status = 'concluido';

        if (state.orders[Indexpedido].ItensConcluidos === 0) {
            state.orders[Indexpedido].ItensConcluidos = 1;
            this.setState(state);
        } else {
            state.orders[Indexpedido].ItensConcluidos = state.orders[Indexpedido].ItensConcluidos + 1;
            this.setState(state);
        }
        this.verifyStatus(Indexpedido);
    }

    verifyStatus = (Indexpedido) => {

        if (this.state.orders[Indexpedido].order.length === this.state.orders[Indexpedido].ItensConcluidos) {
            this.state.orders[Indexpedido].statusPedido = 'concluido';
            axios.put(`${process.env.REACT_APP_BACK_END}/update-order`, this.state.orders[Indexpedido])
                .then((res) => {
                    // this.context.state.socket.emit('orderFinished', res);
                })
                .catch((err) => {
                    console.log('front erros', err)
                })
        }

    }

    render() {
        return (
            <AppContext.Consumer>
                {
                    context => (
                        <React.Fragment>
                            <header>
                                <div className="container-header">
                                    <h2> <a href="#">PEDIDOS COZINHA IRON LANCHES </a></h2>
                                    <a href="#"><i className="fas fa-user-cog"></i></a>
                                </div>
                            </header>

                            <section className="main">
                                <div className="cards active-tables">
                                    <div className="title">
                                        <h3>Mesas Ativas</h3>
                                        <h3 title="Quantidade de pedidos">00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {this.state.tables.map((nMesa, index) => {
                                                return (
                                                    <li key={index} className="item">
                                                        <div className="title-list-tables" >
                                                            <h3>Mesa {nMesa}</h3>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="cards right">
                                    <div className="title">
                                        <h3>Realizados</h3>
                                        <h3 title="Quantidade de pedidos">00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {
                                                this.state.orders.map((pedido, index) => {
                                                    return pedido.statusPedido === 'realizado' && <PedidoRealizado pedido={pedido} key={index} timeLeft={this.alterStateTempoRestante} alterStateLate={this.alterStateAtrasado} alterStateFinished={this.alterStateConcluido} index={index} />;
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="cards late">
                                    <div className="title">
                                        <h3>Atrasados </h3>
                                        <h3>00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {this.state.orders.map((pedido, index) => {
                                                return pedido.statusPedido === 'atrasado' && <PedidoRealizado pedido={pedido} key={index} timeLeft={this.alterStateTempoRestante} alterStateLate={this.alterStateAtrasado} alterStateFinished={this.alterStateConcluido} index={index} />;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="cards completed">
                                    <div className="title">
                                        <h3>Concluidos </h3>
                                        <h3>00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {this.state.orders.map((pedido, index) => {
                                                return pedido.statusPedido === 'concluido' && <PedidoRealizado pedido={pedido} key={index} timeLeft={this.alterStateTempoRestante} alterStateLate={this.alterStateAtrasado} index={index} />;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        </React.Fragment>
                    )
                }
            </AppContext.Consumer>
        )
    }
}

Kitchen.contextType = AppContext;

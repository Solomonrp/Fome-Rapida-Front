import React, { Component } from 'react';
import './styles.css';
import AppContext from "../../context/AppContext";
import PedidoRealizado from "../Kitchen/PedidoRealizado";

export default class Kitchen extends Component {

    componentDidMount () {
        this.context.counterLis();
    }

    render() {
        return (
            <AppContext.Consumer>
                {
                    context => (
                        <React.Fragment>
                            <header>
                                <div className="container-header">
                                    <h2> <a href="#">PEDIDOS COZINHA "NOME RESTAURANTE" 'logo aqui' </a></h2>
                                    <a href="#"><i className="fas fa-user-cog"></i></a>
                                </div>
                            </header>

                            <section className="main">
                                <div className="cards active-tables" style={{ border: "2px solid #fafa054f" }}>
                                    <div className="title">
                                        <h3>Mesas Ativas</h3>
                                        <h3 title="Quantidade de pedidos">00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {context.state.realizando.map((pedido, index) => {
                                                return (
                                                    <li key={index} className="item">
                                                        <div className="title-list" >
                                                            <h3>Mesa {pedido.mesa}</h3>
                                                        </div>
                                                    </li>)
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="cards right" style={{ border: "2px solid #00800069" }}>
                                    <div className="title">
                                        <h3>Realizados</h3>
                                        <h3 title="Quantidade de pedidos">00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {context.state.pedidos.map((pedido, index) => {
                                                return pedido.statusPedido === 'realizado' && <PedidoRealizado pedido={pedido} key={index} index={index} />;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="cards late" style={{ border: "2px solid #ff000063" }}>
                                    <div className="title">
                                        <h3>Atrasados </h3>
                                        <h3>00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {context.state.pedidos.map((pedido, index) => {
                                                return pedido.statusPedido === 'atrasado' && <PedidoRealizado pedido={pedido} key={index} index={index} />;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="cards completed" style={{ border: "2px solid #0000ff63" }}>
                                    <div className="title">
                                        <h3>Concluidos </h3>
                                        <h3>00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {context.state.pedidos.map((pedido, index) => {
                                                return pedido.statusPedido === 'concluido' && <PedidoRealizado pedido={pedido} key={index} index={index} />;
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
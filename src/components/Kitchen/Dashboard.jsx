import React, { Component } from 'react';
import './styles.css';
import AppContext from "../../context/AppContext";
import PedidoRealizado from "../Kitchen/PedidoRealizado";

export default class Kitchen extends Component {

    toggleState = () => {

    }

    viewRequest = (event) => {
        let parent = event.target.parentNode.parentNode;
        let request = parent.children[1];

        if (request.classList == 'pedido') {
            request.classList.add('hide');
        } else {
            request.classList.remove('hide');
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
                                    <h2>PEDIDOS COZINHA "NOME RESTAURANTE"</h2>
                                    <a href="#">LOGO VAI AQUI</a>
                                </div>
                            </header>

                            <section className="main">
                                <div className="cards" style={{ border: "2px solid #fafa054f" }}>
                                    <div className="title">
                                        <h3>Realizando 😋</h3>
                                        <h3>00</h3>
                                    </div>
                                    <div className="list">
                                        <ul className="itens">
                                            {context.state.realizando.map((pedido, index) => {
                                                return (
                                                    <li key={index} className="item">
                                                        <div className="title-list" >
                                                            <h3>Pedido {pedido.numPedido}</h3>
                                                            <h3>Mesa {pedido.mesa}</h3>
                                                            <button onClick={this.viewRequest}><i className="fas fa-angle-double-right"></i></button>
                                                        </div>
                                                        <div className="pedido hide">
                                                            <ul>
                                                                <li>
                                                                    <table>
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="th">Item</th>
                                                                                <th>Quantidade</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <th>{pedido.item}</th>
                                                                                <th>{pedido.quantidade}</th>
                                                                            </tr>
                                                                        </tbody>
                                                                        <tfoot></tfoot>
                                                                    </table>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>)
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="cards" style={{ border: "2px solid #00800069" }}>
                                    <div className="title">
                                        <h3>Realizados 😍</h3>
                                        <h3>00</h3>
                                    </div>
                                    <div className="list"> 
                                        <ul className="itens">
                                            {context.state.pedidos.map((pedido, index) => {
                                               return pedido.statusPedido === 'realizado' && <PedidoRealizado pedido={pedido} key={index} index={index} />;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="cards" style={{ border: "2px solid #ff000063" }}>
                                    <div className="title">
                                        <h3>Atrasados 😓</h3>
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
                                <div className="cards" style={{ border: "2px solid #0000ff63" }}>
                                    <div className="title">
                                        <h3>Concluidos 😝</h3>
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

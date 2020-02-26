import React, { Component } from 'react';
import Item from '../Kitchen/Item';

export default class PedidoRealizado extends Component {

    render() {
        return (
            <li className="item">
                <div className="title-list">
                    <h3>Pedido {this.props.pedido.numPedido}</h3>
                    <h3>Mesa {this.props.pedido.mesa}</h3>
                </div>
                <div className="pedido">
                    <table>
                        <thead>
                            <tr>
                                <th className="">Item</th>
                                <th>Quantidade</th>
                                <th>Tempo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.pedido.itens.map((item, index) => {
                               return <Item product={item} key={index} index={index} pedido={this.props.index}/>
                            })}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </li>
        )
    }
}

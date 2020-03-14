import React, { Component } from 'react';
import Item from '../Kitchen/Item';
import AppContext from "../../context/AppContext";


export default class PedidoRealizado extends Component {
    state = {
        timeLeft: this.props.pedido.tempoTotalRestante.split(":"),
    }

    componentDidMount() {
        this.changeTime();
        this.context.counterLis();
    }

    changeTime = () => {      
        if (this.props.pedido.statusPedido === 'realizado') {
            let timeLeft = this.state.timeLeft;
            this.interval = setInterval(() => {
                
                if (timeLeft[1] > '00') {
                    timeLeft[1] -= 1;
                    timeLeft[1].toString().length < 2 ? timeLeft[1] = `0${timeLeft[1]}` : timeLeft[1] = timeLeft[1].toString();
                    this.setState({ timeLeft });
                    this.props.timeLeft("pedido", this.props.index, '', this.state.timeLeft);
                } else if (timeLeft[0] > '00') {
                    timeLeft[0] -= 1;
                    timeLeft[1] = 59;
                    this.setState({ timeLeft });
                    this.props.timeLeft("pedido", this.props.index, '', this.state.timeLeft);
                } else {
                    clearInterval(this.interval);
                    this.props.timeLeft("pedido", this.props.index, '', this.state.timeLeft);
                    this.props.alterStateLate("pedido", this.props.index);
                };
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.context.counterLis();
    }

    viewRequest = (event) => {
        let parent = event.target.parentNode.parentNode;
        let request = parent.parentNode.children[1];
        let icon = parent.children[3].children[0];

        if (request.classList.value == 'pedido') {
            request.classList.add('hide');
            icon.classList.remove('icon-active');
        } else {
            request.classList.remove('hide');
            icon.classList.add('icon-active');
        }
    }

    render() {
        return (
            <li className="item">
                {
                    this.props.pedido.statusPedido === 'concluido' ?
                        <React.Fragment>
                            <div className="title-list">
                                <h3>Pedido {this.props.pedido.numPedido}</h3>
                                <h3>Mesa {this.props.pedido.mesa}</h3>
                                <h3 title='Tempo Restante'>{this.state.timeLeft[0]}m:{this.state.timeLeft[1]}s</h3>
                                <a onClick={this.viewRequest}><i className="fas fa-chevron-down"></i></a>
                            </div>
                            < div className="pedido hide">
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
                                        {this.props.pedido.order.map((item, index) => {
                                            return <Item product={item} key={index} index={index} timeLeft={this.props.timeLeft} alterStateLate={this.props.alterStateLate} alterStateFinished={this.props.alterStateFinished} pedido={this.props.index} />
                                        })}
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div className="title-list">
                                <h3>Pedido {this.props.pedido.numberOrder}</h3>
                                <h3>Mesa {this.props.pedido.mesa}</h3>
                                <h3 title='Tempo Restante'>{this.state.timeLeft[0]}m:{this.state.timeLeft[1]}s</h3>
                            </div>
                            < div className="pedido">
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
                                        { this.props.pedido.order.map((item, index) => {
                                            return <Item product={item} key={index} index={index} timeLeft={this.props.timeLeft} alterStateLate={this.props.alterStateLate} alterStateFinished={this.props.alterStateFinished} pedido={this.props.index} />
                                        })}                                             
                                        
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        </React.Fragment>
                }
            </li >
        )
    }
}

PedidoRealizado.contextType = AppContext;
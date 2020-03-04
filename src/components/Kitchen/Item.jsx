import React, { Component } from 'react';
import AppContext from "../../context/AppContext";

export default class Item extends Component {
    state = {
        timeLeft: this.context.state.pedidos[this.props.pedido].itens[this.props.index].tempoRestante.split(":"),
    }

    componentDidMount() {
        this.changeTime();
    }

    changeTime = () => {
        if (this.context.state.pedidos[this.props.pedido].itens[this.props.index].status === 'realizando') {
            let timeLeft = this.state.timeLeft;
            this.interval = setInterval(() => {

                if (timeLeft[1] > '00') {
                    timeLeft[1] -= 1;
                    timeLeft[1].toString().length < 2 ? timeLeft[1] = `0${timeLeft[1]}` : timeLeft[1] = timeLeft[1].toString();
                    this.setState({ timeLeft });
                    this.context.alterStateTempoRestante("item", this.props.pedido, this.props.index, this.state.timeLeft);
                } else if (timeLeft[0] > '0') {
                    timeLeft[0] -= 1;
                    timeLeft[1] = 59;
                    this.setState({ timeLeft });
                    this.context.alterStateTempoRestante("item", this.props.pedido, this.props.index, this.state.timeLeft);
                } else {
                    clearInterval(this.interval);
                    this.context.alterStateTempoRestante("item", this.props.pedido, this.props.index, this.state.timeLeft);
                    this.context.alterStateAtrasado("item", this.props.pedido, this.props.index);
                };
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    alterStateConcluido = () => {
        clearInterval(this.interval);
        this.context.alterStateConcluido(this.props.pedido, this.props.index)
        this.changeTime();
    }

    render() {
        return (
            <AppContext.Consumer>
                {
                    context => (
                        <React.Fragment>
                            {
                                this.context.state.pedidos[this.props.pedido].itens[this.props.index].status === 'realizando' &&
                                <tr>
                                    <th>{this.props.product.product}</th>
                                    <th>{this.props.product.quantidade}</th>
                                    <th>{this.state.timeLeft[0]}m:{this.state.timeLeft[1]}s</th>
                                    <th><button onClick={this.alterStateConcluido} className='button-finished'><i className="fas fa-check"></i></button></th>
                                </tr>
                            }
                            {
                                this.context.state.pedidos[this.props.pedido].itens[this.props.index].status === 'atrasado' &&
                                <tr className='trAtrasada'>
                                    <th>{this.props.product.product}</th>
                                    <th>{this.props.product.quantidade}</th>
                                    <th>{this.state.timeLeft[0]}m:{this.state.timeLeft[1]}s</th>
                                    <th><button onClick={this.alterStateConcluido} className='button-finished'><i className="fas fa-check"></i></button></th>
                                </tr>
                            }
                            {
                                this.context.state.pedidos[this.props.pedido].itens[this.props.index].status === 'concluido' &&
                                <tr className='trConcluida'>
                                    <th>{this.props.product.product}</th>
                                    <th>{this.props.product.quantidade}</th>
                                    <th>{this.state.timeLeft[0]}m:{this.state.timeLeft[1]}s</th>
                                    <th><i className="fas fa-check-double"></i></th>
                                </tr>
                            }

                        </React.Fragment>
                    )
                }
            </AppContext.Consumer>
        )
    }
}

Item.contextType = AppContext;
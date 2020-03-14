import React, { Component } from 'react';
import AppContext from "../../context/AppContext";

export default class Item extends Component {
    state = {
        timeLeft: this.props.product.time.split(":"),
    }

    componentDidMount() {      
        this.changeTime();
    }

    changeTime = () => {
        if (this.props.product.status === 'realizando') {
            let timeLeft = this.state.timeLeft;
            this.interval = setInterval(() => {

                if (timeLeft[1] > '00') {
                    timeLeft[1] -= 1;
                    timeLeft[1].toString().length < 2 ? timeLeft[1] = `0${timeLeft[1]}` : timeLeft[1] = timeLeft[1].toString();
                    this.setState({ timeLeft });
                    this.props.timeLeft("item", this.props.pedido, this.props.index, this.state.timeLeft);
                } else if (timeLeft[0] > '00') {
                    timeLeft[0] -= 1;
                    timeLeft[1] = 59;
                    this.setState({ timeLeft });
                    this.props.timeLeft("item", this.props.pedido, this.props.index, this.state.timeLeft);
                } else {
                    clearInterval(this.interval);
                    this.props.timeLeft("item", this.props.pedido, this.props.index, this.state.timeLeft);
                    this.props.alterStateLate("item", this.props.pedido, this.props.index);
                };
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    alterStateConcluido = () => {
        clearInterval(this.interval);
        this.props.alterStateFinished(this.props.pedido, this.props.index)
        this.changeTime();
    }

    render() {
        return (
            <AppContext.Consumer>
                {
                    context => (
                        <React.Fragment>

                            {
                                this.props.product.status === 'realizando' &&
                                <tr>
                                    <th>{this.props.product.name}</th>
                                    <th>{this.props.product.quantity}</th>
                                    <th>{this.state.timeLeft[0]}m:{this.state.timeLeft[1]}s</th>
                                    <th><button onClick={this.alterStateConcluido} className='button-finished'><i className="fas fa-check"></i></button></th>
                                </tr>
                            }
                            {
                                this.props.product.status === 'atrasado' &&
                                <tr className='trAtrasada'>
                                    <th>{this.props.product.name}</th>
                                    <th>{this.props.product.quantity}</th>
                                    <th>{this.state.timeLeft[0]}m:{this.state.timeLeft[1]}s</th>
                                    <th><button onClick={this.alterStateConcluido} className='button-finished'><i className="fas fa-check"></i></button></th>
                                </tr>
                            }
                            {
                                this.props.product.status === 'concluido' &&
                                <tr className='trConcluida'>
                                    <th>{this.props.product.name}</th>
                                    <th>{this.props.product.quantity}</th>
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
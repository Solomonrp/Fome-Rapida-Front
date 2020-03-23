import React, { Component } from 'react'
import axios from 'axios';

export default class AddCategoria extends Component {

    state = {
        name: '',
        allCategory: [],
    };

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACK_END}/AllCategory`)
            .then((categorys) => {
                this.setState({
                    allCategory: categorys.data,
                })
            })
            .catch((err) => {
                console.log('error');
            })
    }

    handleInput = (name) => {
        const state = {};
        state[name.target.name] = name.target.value;
        this.setState(state);
    };

    addNewCategoria = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_BACK_END}/newCategory`, this.state)
            .then((newCategory) => {
                this.setState({ allCategory: [...this.state.allCategory, newCategory.data] })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <div className="top-actions">
                    <h2 className='title-admin'>
                        Categorias
                    </h2>
                    <form className='form-new' onSubmit={this.addNewCategoria}>
                        <input maxLength="100" type="text" placeholder='Nome' onChange={this.handleInput} value={this.state.name} name='name' required />
                        <button type='submit' className='btn-add'>Adicionar</button>
                    </form>
                </div>
                <div className="list table-conteudo">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th className='title-table-name'>Nome</th>
                            <th title='Quantidade de produtos dentro da categoria'>Quantidade Produtos</th>
                            <th>Ações</th>
                        </tr>
                        {

                            this.state.allCategory.length === 0 ? <div class="circle"></div> :
                                this.state.allCategory.map((category, index) => {
                                    return (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{category.name}</td>
                                            <td>{category.quantityProducts}</td>
                                            <td><button className='btn-editar'>Editar</button><button className='btn-excluir'>Excluir</button></td>
                                        </tr>
                                    )
                                })
                        }
                    </table>
                </div>
            </div>
        )
    }
}

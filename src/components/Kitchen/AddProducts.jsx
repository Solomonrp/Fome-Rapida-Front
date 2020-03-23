import React, { Component } from 'react';
import axios from 'axios';

export default class AddProducts extends Component {

    state = {
        name: '',
        price: '',
        time: '',
        category: '',
        allCategory: [],
        allProducts: [],
    };

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACK_END}/AllCategory`)
            .then((categorys) => {
                console.log(categorys.data.length);
                this.setState({
                    category: categorys.data[0].name, //Pega sempre o primeiro item da lista, para caso o tenha somente um categoria cadastrasda, pois estava dando erro somente com uma :)
                    allCategory: categorys.data,
                })
            })
            .catch((err) => {
                console.log('error');
            })
        axios.get(`${process.env.REACT_APP_BACK_END}/AllProducts`)
            .then((products) => {
                this.setState({
                    allProducts: products.data,
                })
            })
            .catch((err) => {
                console.log('error', err);
            })
    }

    handleInput = (name) => {
        const state = {};
        state[name.target.name] = name.target.value;
        this.setState(state);

    }


    addNewProduct = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_BACK_END}/newProduct`, this.state)
            .then((newProduct) => {
                this.setState({ allProducts: [...this.state.allProducts, newProduct.data] })
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
                        Produtos
                    </h2>
                    <form className='form-products' onSubmit={this.addNewProduct}>
                        <input required maxLength="100" type="text" placeholder='Nome' name='name' onChange={this.handleInput} />
                        <input required maxLength="100" type="text" placeholder='Preço' name='price' onChange={this.handleInput} />
                        <input required maxLength="100" type="text" placeholder='Tempo de Preparo 0:00' name='time' onChange={this.handleInput} />
                        <label>Categorias:</label>
                        <select name="category" onChange={this.handleInput} value={this.state.category} required>
                            {
                                this.state.allCategory.map((category, index) => {
                                    return (
                                        <option key={index} value={category.name}>{category.name}</option>
                                    )

                                })
                            }
                        </select>
                        <button type='submit' className='btn-add'>Adicionar</button>
                    </form>
                </div>
                <div className="list table-conteudo">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço R$</th>
                            <th>Tempo</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                        {
                            this.state.allProducts.length === 0 ? <div class="circle"></div> :
                                this.state.allProducts.map((product, index) => {
                                    return (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.time}</td>
                                            <td>{product.category}</td>
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

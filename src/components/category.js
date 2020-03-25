import React, { Component } from 'react';
import '../style/category.css';
import Food from '../components/food';
import Nav from './nav';
import Cart from './cart';
import querySearch from 'stringquery';

class Category extends Component {

  componentDidMount() {
    document.body.classList.add('categoryBack');
    const socket = this.props.socket;
    const query = localStorage.getItem("table")
    let id = querySearch(window.location.search);

    socket.emit('log', query);
    console.log('idauth',id.auth)
    console.log(localStorage.getItem("auth"))
    if(id.auth === localStorage.getItem("auth") || id.auth === undefined ){
      console.log('deve estar aqui')
    } else {
      localStorage.setItem("auth", id.auth);
      console.log('não deve estar aqui')
    }

    if(id.id === localStorage.getItem("id") || id.id === undefined ){
      console.log('deve estar aqui')
    } else {
      localStorage.setItem("id", id.id);
      console.log('não deve estar aqui')
    }
    socket.emit('log', query);
    socket.emit('userLogin', query);
    this.props.handleGetCategory()
  }

  // não deve estar aqui
  componentWillUnmount() {
    document.body.classList.remove('categoryBack');
  }

  render() {
    return (
      <div className="wrapper2">
        <Nav cart={this.props.state} />
        <div className="category">
          <div>
            <h1 className="food__tittle">Categorias</h1>
          </div>
          <div>
            {
              this.props.data.map ?
                this.props.data.map((food, index) => {
                  return <Food key={index} type='category' {...food} />
                })
                :
                <div>Loading</div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Category;

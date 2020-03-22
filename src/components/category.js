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
    console.log('query', query);
    console.log('id', id)
    socket.emit('log', query);
    localStorage.setItem("id", id.id);
    localStorage.setItem("auth", id.auth);
    socket.emit('userLogin', query);
  }

  componentWillUnmount() {
    document.body.classList.remove('categoryBack');
  }

  render() {
    return (
      <div className="wrapper2">
        <Nav cart={this.props.data} />
        <div className="category">
          {
            this.props.data.map ?
              this.props.data.map((food, index) => {
                return <Food key={index} type='category' {...food} />
              })
              :
              <div>Loading</div>
          }
          <Food type='category' />
          <Food type='category' />
          <Food type='category' />
        </div>
      </div>
    )
  }
}

export default Category;

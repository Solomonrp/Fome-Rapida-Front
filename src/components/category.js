import React, { Component } from 'react';
import '../style/category.css';
import Food from '../components/food';
import Nav from './nav';
import Cart from './cart';

class Category extends Component {

  // componentDidMount() {
  //   this.props.background(33);
  // }

  componentDidMount() {
    document.body.classList.add('categoryBack');
  }

  componentWillUnmount() {
    document.body.classList.remove('categoryBack');
  }

  render() {
    return (
      <div className="wrapper2">
        <Nav />
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
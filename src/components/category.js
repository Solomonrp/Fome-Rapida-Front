import React, { Component } from 'react';
import '../style/category.css';
import Food from '../components/food';

class Category extends Component {
  render() {
    return (
      <div className="wrapper2">
        <div className="category">
          {
            this.props.data.map ? 
            this.props.data.map((food, index) => {
              return <Food key={index} type='category' {...food}/> 
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
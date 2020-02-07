import React, { Component } from 'react';

import Food from '../components/food';

class Category extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="category">
          <Food type='category' />
          <Food type='category' />
          <Food type='category' />
        </div>
        </React.Fragment>
        )
      }
    }

export default Category;
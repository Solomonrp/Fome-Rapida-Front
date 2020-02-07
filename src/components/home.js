import React, { Component } from 'react';
import '../style/home.css'
import Category from '../components/category';

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Category />
      </div>
    )
  }
}

export default Home;
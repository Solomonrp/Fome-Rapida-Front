import React, { Component } from 'react';
import Food from '../components/food';
import Nav from '../components/nav';
import Cart from '../components/cart';
import queryString from 'query-string';

class Itens extends Component {

  state = {
    filtered: [],
  }

  componentDidMount() {
    const category = this.props.location.search;
    const params = queryString.parse(category);
    this.handleCategory();
    document.body.classList.add('itensBack');
  }

  componentWillUnmount() {
    document.body.classList.remove('itensBack');
  }

  handleCategory = () => {
    const category = this.props.location.search;
    const params = queryString.parse(category);

    const filtered = this.props.data.filter(food => {
      return food.category === params.category;
    })

    this.setState({
      filtered: filtered
    })

  }

  render() {
    return (
      <React.Fragment>
        <Nav />
        <div>
          {
            this.state.filtered ?
              this.state.filtered.map((food, index) => {
                return <Food type='food' id={index} {...food} handleCart={this.props.cartHandler} />
              })
              :
              <div>Loading</div>
          }
          {/* <Food type='food' handleCart={this.props.cartHandler} /> */}
        </div>
      </React.Fragment>
    )
  }
}

export default Itens;
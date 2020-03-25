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

  handleCategory = async () => {

    try {
      const category = this.props.location.search;
      await this.props.handleGetFood(queryString.parse(category).category);
      this.setState({
        filtered : this.props.data
      })
      console.log('teste', this.props.data)
    } catch (error) {
      console.log(error)
    }

  }

  render() {
    return (
      <React.Fragment>
        <Nav />
        <h1 className="food__tittle">Itens</h1>
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
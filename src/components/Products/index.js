import React, { Component } from 'react';

export default class extends Component {
  state = {
    isLoading: true,
    products: [
      "https://picsum.photos/400/400/?image=99",
      "https://picsum.photos/400/400/?image=199",
      "https://picsum.photos/400/400/?image=299",
      "https://picsum.photos/400/400/?image=399",
      "https://picsum.photos/400/400/?image=499",
      "https://picsum.photos/400/400/?image=599",
      "https://picsum.photos/400/400/?image=699",
      "https://picsum.photos/400/400/?image=799"
    ]
  };

  componentDidMount() {
    this.setState({ isLoading: !this.state.isLoading });
  }

  handleProducts = () => {
    // let { products } = this.state;
  };

  render() {
    let { isLoading, products } = this.state;

    if (isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div className="product">
        {products.length && (
          <div className="product__list">
            {products.map((item, index) => (
              <div className="product__item" key={index}>
                <img className="product__item-img" src={item} alt="product"/>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

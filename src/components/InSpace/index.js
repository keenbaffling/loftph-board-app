import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { users: items } = this.props;

    return (
      <div className="avatar">
        {!!items && !!items.length ? (
          <React.Fragment>
            {items.map((item, index) => (
              <div className="avatar__item" key={index}>
                <img className="img avatar__item-img" src={item} alt="" />
              </div>
            ))}
          </React.Fragment>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

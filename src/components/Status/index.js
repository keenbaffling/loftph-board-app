import React, { Component } from 'react';
import List from './List';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { status } = this.props;

    return (
      <React.Fragment>
        <List status={status} />
      </React.Fragment>
    );
  }
}

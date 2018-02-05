import React, { Component } from 'react';

import List from './List';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      newsOverlay: require('../../assets/images/bg-events.jpg'),
      news: this.props.news
    };
  }

  componentDidMount() {
    this.handleItemAnimation();
  }

  componentWillReceiveProps(nextProps) {
    let { news } = nextProps;
    this.setState({ news, isLoading: false });
  }

  handleItemAnimation = () => {};

  render() {
    const { isLoading, news } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <div className="news__header text-center text-uppercase">
          <h2 className="news__heading">LOFT Events Calendar</h2>
        </div>

        <List items={news} />
      </React.Fragment>
    );
  }
}

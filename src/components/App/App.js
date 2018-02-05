import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import '../../assets/fonts/gotham/stylesheet.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Status from '../Status';
import News from '../News';
import InSpace from '../InSpace';
import Slack from '../Slack';
import Products from '../Products';

class App extends Component {
  state = {
    isLoading: true,
    url: 'http://localhost:3000',
    users: require('../../data/users.json'),
    news: [],
    status: [
      {
        title: 'Hot Desks',
        total: '50',
        occupied: '8',
        id: 1
      },
      {
        title: 'Conference Rooms',
        total: '4',
        occupied: '2',
        id: 2
      },
      {
        title: 'Patio',
        total: '40',
        occupied: '12',
        id: 2
      },
      {
        title: 'Event Space',
        total: '4',
        occupied: '3',
        id: 2
      }
    ]
  };

  componentDidMount() {
    this.handleNews();
  }

  handleNews = () => {
    axios('https://loft.ph/api/announcements')
      .then(res => res.data)
      .then(news => this.setState({ news }))
      .then(this.setState({ isLoading: false }))
      .catch(console.error);
  };

  handleStatus = () => {
    axios('https://loft.ph/api/availabilityv2')
      .then(res => res.data)
      .then(status => this.setState({ status }))
      .catch(console.error);
  };

  render() {
    const { isLoading, news, status, users } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>LOFT Coworking Philippines</title>
        </Helmet>
        <div className="container-fluid">
          <div className="row">
            <div className="block block--top">
              <div className="block__content block__content--1">
                <div className="video--wrap">
                  <div className="video__item">
                    <iframe
                      width="100%"
                      src="https://www.youtube.com/embed/rj81emE48wI?autoplay=1&loop=1&mute=1&controls=0&showinfo=0&modestbranding=1"
                      frameBorder="0"
                      allow="encrypted-media"
                      allowFullScreen
                      title="test"
                    />
                  </div>
                  <div className="video__item">
                    <iframe
                      width="100%"
                      src="https://www.youtube.com/embed?listType=playlist&loop=1&modestbranding=1&controls=0&autoplay=1&showinfo=0&mute=1&list=PLNjtSuUpt389k5pEV8FvEWE5g7HvhghK9"
                      frameBorder="0"
                      allow="encrypted-media"
                      allowFullScreen
                      title="test"
                    />
                  </div>
                </div>
              </div>
              <div className="block__content block__content--2">
                <div className="col-md-6 slack--wrap">
                  <Slack />
                </div>
                <div className="col-md-6 news--wrap">
                  <News news={news} />
                </div>
              </div>
              <div className="block__content block__content--3">
                <Products />
              </div>
            </div>
            <div className="block block--bottom">
              <div className="col-md-3">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 3836 1024"
                  height="100%"
                  width="100%"
                >
                  <title>Loft</title>
                  <g className="icon" style={{ fill: '#fff' }}>
                    <path d="M207.205 215.53c20.35 11.1 40.701 23.126 61.051 34.226 77.702 43.476 155.404 87.877 233.106 131.353 3.7 1.85 6.475 1.85 10.175 0 50.876-29.601 100.827-60.126 151.704-89.727 1.85-0.925 3.7-1.85 5.55-3.7 0 2.775 0 4.625 0 6.475 0 25.901 0 51.801 0 77.702 0 3.7-0.925 5.55-4.625 8.325-56.426 32.376-112.853 64.752-168.354 98.052-3.7 1.85-5.55 1.85-9.25 0-120.253-70.302-241.431-140.603-362.609-210.905-0.925-0.925-2.775-1.85-4.625-2.775 1.85-0.925 3.7-2.775 5.55-3.7 24.976-13.875 49.026-27.751 74.002-40.701 1.85-0.925 3.7-2.775 5.55-3.7s1.85-0.925 2.775-0.925z" />
                    <path d="M119.328 455.111c19.425-11.1 37.001-22.201 55.501-33.301 7.4-3.7 13.875-8.325 21.276-12.95 3.7-1.85 5.55-1.85 9.25 0 92.502 51.801 185.005 102.678 277.507 154.479 6.475 3.7 11.1 3.7 17.575 0 61.051-34.226 123.028-67.527 184.079-101.752 1.85-0.925 3.7-1.85 5.55-2.775 0 1.85 0 3.7 0 4.625 0 26.826 0 52.726 0 79.552 0 3.7-0.925 5.55-4.625 7.4-63.827 37.001-126.728 74.002-190.555 111.003-2.775 1.85-5.55 1.85-9.25 0-121.178-68.452-241.431-136.903-362.609-204.43 0 0-0.925-0.925-3.7-1.85z" />
                    <path d="M112.853 646.591c1.85-0.925 3.7-1.85 5.55-2.775 25.901-12.025 51.801-24.051 77.702-36.076 3.7-1.85 6.475-1.85 10.175 0 93.427 49.951 186.855 99.902 280.282 149.854 3.7 1.85 6.475 1.85 10.175 0 69.377-38.851 139.678-77.702 209.055-116.553 1.85-0.925 4.625-1.85 6.475-3.7 0 1.85 0 3.7 0 4.625 0 24.051 0 48.101 0 72.152 0 3.7-0.925 5.55-3.7 7.4-71.227 41.626-142.453 83.252-213.68 124.878-2.775 1.85-4.625 1.85-8.325 0-123.028-65.677-246.981-132.278-370.009-197.955-0.925 0-1.85-0.925-3.7-1.85z" />
                    <path d="M1125.752 270.107c35.151 0 70.302 0.925 105.453 0.925 4.625 0 9.25 0 15.725 0 0 142.453 0 283.982 0 426.435 92.502 0 183.154 0 274.732 0 0 36.076 0 71.227 0 107.303-4.625 0-9.25 0-12.95 0-123.028 0-245.131 0-368.159 0-4.625 0-9.25 0.925-13.875 0.925-0.925-179.454-0.925-357.984-0.925-535.588z" />
                    <path d="M2029.5 261.781c68.452 2.775 128.578 27.751 180.379 72.152 36.076 30.526 61.051 68.452 75.852 111.928 6.475 19.425 9.25 40.701 12.95 61.977 6.475 40.701 0.925 81.402-12.95 119.328-12.95 35.151-32.376 66.602-58.276 94.352-33.301 36.076-74.002 60.126-120.253 75.852-40.701 13.875-83.252 17.575-125.803 14.8-63.827-4.625-123.028-26.826-172.054-67.527-47.176-39.776-78.627-90.652-89.727-151.704-12.025-62.902-4.625-124.878 25.901-182.229 32.376-59.201 79.552-101.752 142.453-126.728 32.376-12.95 66.602-21.276 101.752-22.201 1.85 0 37.001 0 39.776 0zM2008.224 703.017c97.127 2.775 165.579-74.002 165.579-164.654 0-98.977-72.152-167.429-165.579-169.279-98.052-1.85-164.654 73.077-166.504 163.729-1.85 97.127 75.852 172.979 166.504 170.204z" />
                    <path d="M2917.521 490.262c0 37.001 0 71.227 0 107.303-86.952 0-172.979 0-260.856 0 0 69.377 0 137.828 0 206.28-41.626 0-81.402 0-122.103 0 0-176.679 0-354.284 0-531.888 138.753 0 278.432 0 418.11 0 0 35.151 0 69.377 0 105.453-98.052 0-196.105 0-296.007 0 0 37.926 0 74.927 0 112.853 86.952 0 173.904 0 260.856 0z" />
                    <path d="M3642.739 378.334c-23.126 0-46.251-0.925-68.452-0.925-29.601 0-58.276 0-87.877 0-3.7 0-8.325 0-12.95 0 0 142.453 0 283.982 0 425.51-40.701 0-79.552 0-120.253 0 0-141.528 0-283.057 0-425.51-56.426 0-111.928 0-168.354 0 0-36.076 0-71.227 0-107.303 4.625 0 9.25 0 13.875 0 143.379 0 286.757 0 429.21 0 4.625 0 9.25-0.925 13.875-0.925 0.925 37.001 0.925 73.077 0.925 109.153z" />
                  </g>
                </svg>
              </div>

              <div className="col-md-5">
                <Status status={status} />
              </div>
              <div className="col-md-4">
                <InSpace users={users} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

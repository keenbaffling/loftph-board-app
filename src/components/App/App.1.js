import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import io from 'socket.io-client';

import '../../assets/fonts/gotham/stylesheet.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Status from '../Status';
import News from '../News';
import InSpace from '../InSpace';

class App extends Component {
  state = {
    isLoading: true,
    url: 'http://localhost:3000',
    users: [
      'https://graph.facebook.com/10214773973964090/picture?type=large',
      'https://graph.facebook.com/10208303267218430/picture?type=large',
      'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
      'https://lh4.googleusercontent.com/-4q3in2lwYvE/AAAAAAAAAAI/AAAAAAAAAAc/R8uWrUcJEnY/photo.jpg',
      'https://lh4.googleusercontent.com/-aqG6hbjpoFs/AAAAAAAAAAI/AAAAAAAAA-E/bA9EPEQVb6E/photo.jpg',
      'https://loft.ph/uploads/avatars/051ea198-df34-4171-a109-3b2bfd38a19e.jpeg',
      'https://loft.ph/uploads/avatars/4a2e6ed2-408a-4c98-9f2f-ff91bfb95f0c.png',
      'https://lh5.googleusercontent.com/-vgg0s3AyszY/AAAAAAAAAAI/AAAAAAAAAOo/4eEgN5hxZeM/photo.jpg',
      'https://graph.facebook.com/10155013529779147/picture?type=large',
      'https://lh5.googleusercontent.com/-2R7F5JMUo-4/AAAAAAAAAAI/AAAAAAAAAG0/H4LBP7EQXHg/photo.jpg',
      'https://lh5.googleusercontent.com/-fHsoDXKP464/AAAAAAAAAAI/AAAAAAAAACw/pX4FI_s0tMM/photo.jpg',
      'https://graph.facebook.com/10155804645968956/picture?type=large',
      'https://graph.facebook.com/10203827019951821/picture?type=large',
      'https://lh4.googleusercontent.com/-vIkcAwLpjPg/AAAAAAAAAAI/AAAAAAAAAjI/fb8ThrGZ8EE/photo.jpg',
      'https://graph.facebook.com/2023429037669105/picture?type=large',
      'https://lh4.googleusercontent.com/-YxhI1SxmT04/AAAAAAAAAAI/AAAAAAAAAF8/bGSawywUFK0/photo.jpg',
      'https://graph.facebook.com/1983266981927741/picture?type=large'
    ],
    news: [
      {
        title: 'Loft Internal Dry Run',
        date: '2017-12-12T00:00:00.000Z',
        location: 'Loft Penthouse'
      },
      {
        title: 'Loft Customer Dry Run',
        date: '2017-12-13T00:00:00.000Z',
        location: 'Loft Penthouse'
      }
    ],
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
      }
    ]
  };

  componentDidMount() {
    // this.handleUsers();
    // this.handleNews();
    // this.handleStatus();

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  handleNews = () => {
    const { url } = this.state;
    const socket = io.connect(url);

    socket.emit('request news', 1000);
    socket.on('news', data => {
      console.log(data);
      // this.setState({ news: data });
    });
  };

  handleStatus = () => {
    const { url } = this.state;
    const socket = io.connect(url.status);

    socket.emit('request data', 1000);
    socket.on('data', data => {
      this.setState({ status: data });
    });
  };

  handleUsers = () => {
    const { url } = this.state;
    const socket = io.connect(url.users);

    socket.emit('request data', 1000);
    socket.on('data', data => {
      this.setState({ users: data });
    });
  };

  render() {
    const { isLoading, news, status, users } = this.state;

    if (isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div className="App">
        <Helmet>
          <title>LOFT Coworking Philippines</title>
        </Helmet>
        <div className="container-fluid">
          <div className="row">
            <div className="block block--top">
              <News news={news} />
            </div>
            <div className="block block--bottom">
              <div className="col-md-6">
                <Status status={status} />
              </div>
              <div className="col-md-6">
                <InSpace users={users} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

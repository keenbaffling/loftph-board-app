import React, { Component } from 'react';
import Slack from 'slack';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

// import List from './List';

const SLACK_BOT_TOKEN = process.env.REACT_APP_SLACK_BOT_TOKEN;
// const SLACK_CLIENT_ID = process.env.REACT_APP_SLACK_CLIENT_ID;
// const SLACK_CLIENT_SECRET = process.env.REACT_APP_SLACK_CLIENT_SECRET;
const SLACK_CHANNEL = process.env.REACT_APP_SLACK_CHANNEL;

const bot = new Slack({ token: SLACK_BOT_TOKEN });

export default class extends Component {
  state = {
    isLoading: true,
    url: '',
    history: null,
    channel: null,
    members: null,
    emoji: null,
    message: null
  };

  componentDidMount() {
    this.rtmConnect();
    // this.rtmStart();
    this.getHistory(SLACK_CHANNEL);
    // this.getChannelInfo(SLACK_CHANNEL);
    this.getUsersList();
    this.getEmoji();
  }

  getHistory = channel => {
    bot.channels
      .history({
        channel,
        count: 30
      })
      .then(res => res.messages)
      .then(history => this.setState({ history }))
      .catch(console.error);
  };

  getChannelInfo = channel => {
    bot.channels
      .info({
        channel
      })
      .then(res => res.channel)
      .then(channel => this.setState({ channel }))
      .catch(console.error);
  };

  getUsersList = () => {
    bot.users
      .list()
      .then(res => res.members)
      .then(members => this.setState({ members }))
      .catch(console.error);
  };

  getEmoji = () => {
    bot.emoji
      .list()
      .then(res => res.emoji)
      .then(emoji => this.setState({ emoji }))
      .catch(console.error);
  };

  rtmConnect = () => {
    bot.rtm
      .connect()
      .then(res => this.setState({ url: res.url }))
      .then(this.handleRTM)
      .catch(console.error);
  };

  rtmStart = () => {
    bot.rtm
      .start()
      .then(res => this.setState({ url: res.url }))
      .then(this.handleRTM)
      .catch(console.error);
  };

  getUser = userId => _.filter(this.state.members, ['id', userId])[0];

  handleUserTag = userTag => {
    let str = '';
    let user = this.getUser(userTag.substr(2, 9));

    if (user) {
      str = `<a className="slack__text-highlight" href="https://loftph.slack.com/team/${
        user.id
      }" target="_blank">@${user.profile.display_name}</a>`;
    }

    return str;
  };

  formatMessage = text => {
    text = text.toString();
    let newText = '';
    let taggedUsers = text.match(/<@\w+>/g);

    if (taggedUsers && taggedUsers.length) {
      // Replace user tags
      _.forEach(taggedUsers, (user, index) => {
        if (newText === '') {
          newText = text.replace(user, this.handleUserTag(user));
        } else {
          newText = newText.replace(user, this.handleUserTag(user));
        }
      });
    } else {
      newText = text;
    }

    // Replace img

    return newText;
  };

  handleRTM = () => {
    const ws = new WebSocket(this.state.url);

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      const { history } = this.state;

      switch (data.type) {
        case 'message':
          if (data.channel === SLACK_CHANNEL && !!data.subtype === false) {
            history.unshift(data);
            this.setState({ history });
          }
          break;

        default:
          break;
      }

      this.setState({ isLoading: false });
    };
  };

  render() {
    const { isLoading, history } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        {history &&
          history.map((item, index) => {
            let user = this.getUser(item.user);
            let profile = user && user.profile;
            let timestamp = new Date(item.ts * 1000).toLocaleString();

            return (
              <div className="slack__message" key={index}>
                <div className="slack__wrap">
                  <div className="slack__gutter">
                    <a href="/" className="slack__avatar">
                      <img
                        className="slac__avatar-img"
                        src={profile.image_192}
                        alt={profile.display_name}
                      />
                    </a>
                  </div>
                  <div className="slack__message-content">
                    <div className="slack__message-header">
                      <span className="slack__message-sender">
                        <a href="/" className="slack__message-sender-link">
                          {profile.display_name}
                        </a>
                      </span>
                      <span href="#" className="slack__timestamp">
                        <span className="slack__timestamp-label">
                          {moment(timestamp).format('LT')}
                        </span>
                      </span>
                    </div>
                    <div
                      className="slack__message-body"
                      dangerouslySetInnerHTML={{
                        __html: this.formatMessage(item.text)
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
}

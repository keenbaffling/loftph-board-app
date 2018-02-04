import React, { Component } from 'react';
import Slack from 'slack';
// import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import slackdown from 'slackdown';
import EmojiConvertor from 'emoji-js';

// import List from './List';

const SLACK_BOT_TOKEN = process.env.REACT_APP_SLACK_BOT_TOKEN;
// const SLACK_CLIENT_ID = process.env.REACT_APP_SLACK_CLIENT_ID;
// const SLACK_CLIENT_SECRET = process.env.REACT_APP_SLACK_CLIENT_SECRET;
const SLACK_CHANNEL = process.env.REACT_APP_SLACK_CHANNEL;

const bot = new Slack({ token: SLACK_BOT_TOKEN });
const emoji = new EmojiConvertor();
emoji.replace_mode = 'img';
emoji.text_mode = false;
emoji.img_set = 'apple';
emoji.img_sets.apple.path = require('emoji-datasource');
emoji.img_sets.apple.sheet = require('emoji-datasource/sheet_apple_64.png');
emoji.use_sheet = true;

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

  componentWillMount() {
    // this.rtmConnect();
    this.rtmStart();
    this.getHistory(SLACK_CHANNEL);
    // this.getChannelInfo(SLACK_CHANNEL);
    this.getUsersList();
    this.getEmoji();
  }

  getHistory = channel => {
    // TODO: Change to channel #general
    bot.conversations
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
      .then(emoji => {
        this.setState({ emoji });
        return emoji;
      })
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

  handleUserInfo = userId => _.filter(this.state.members, ['id', userId])[0];

  parseUserTag = str => {
    let taggedUsers = str.match(/(<@.+>)/g);

    if (taggedUsers && taggedUsers.length) {
      _.forEach(taggedUsers, (user, index) => {
        let userData = this.handleUserInfo(user.substr(2, 9));
        let strTemplate = `https://loftph.slack.com/team/${userData.id}|@${
          userData.profile.display_name || userData.profile.real_name_normalized
        }`;

        str = str.replace(`@${userData.id}`, strTemplate);
      });
    }

    return str;
  };

  parseChannelTag = str => {
    let taggedChannels = str.match(/(<#.+>)/g);

    if (taggedChannels && taggedChannels.length) {
      _.forEach(taggedChannels, (channel, index) => {
        let id = channel.substr(2, 9);
        let strTemplate = `https://loftph.slack.com/archives/${id}`;

        str = str.replace(`#${id}`, strTemplate);
      });
    }

    return str;
  };

  parseAttachments = str => {
    let newStr = '';

    // console.log(str.split('|'));

    newStr = str;

    return newStr;
  };

  matchEmoji = colonFormat => {
    return _.pick(this.state.emoji, [colonFormat.replace(/:/g, '')]);
  };

  parseCustomEmoji = str => {
    let regex = /(:[a-zA-Z0-9-_]+:)/g;

    _.replace(str, regex, string => {
      _.forEach(this.matchEmoji(string), (value, key) => {
        str = str.replace(
          string,
          `<span class="emoji-outer emoji-sizer"><span class="emoji-inner" style="background-image: url(${value}); background-size: contain;"></span></span>`
        );
      });
    });

    return str;
  };

  parseEmoji = str => {
    str = emoji.replace_colons(str);
    str = this.parseCustomEmoji(str);

    return str;
  };

  formatMessage = str => {
    str = str.toString();

    // Replace user tags
    str = this.parseUserTag(str);

    // Replace channel tags
    str = this.parseChannelTag(str);

    // Parse markdown tags
    str = slackdown.parse(str);

    // Parse emojis
    str = this.parseEmoji(str);

    // Replace new lines
    str = str.replace(/\n/g, '<br>');

    // Replace attachments
    // str = this.parseAttachments(str);

    return str;
  };

  handleRTM = () => {
    const ws = new WebSocket(this.state.url);

    ws.onopen = event => {
      this.setState({ isLoading: false });
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      const { history } = this.state;

      switch (data.type) {
        case 'message':
          if (data.channel === SLACK_CHANNEL) {
            history.unshift(data);
            this.setState({ history });
          }
          break;

        default:
          break;
      }
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
            let user = this.handleUserInfo(item.user);
            let profile = user && user.profile;
            let timestamp = new Date(item.ts * 1000).toUTCString();

            return (
              <div className="slack__item" key={index}>
                <div className="slack__item-wrap">
                  <div className="slack__gutter">
                    <a
                      href={`https://loftph.slack.com/team/${user.id}`}
                      className="slack__avatar"
                    >
                      <img
                        className="slack__avatar-img"
                        src={profile.image_192}
                        alt={profile.display_name || profile.real_name_normalized}
                      />
                    </a>
                  </div>
                  <div className="slack__message-content">
                    <div className="slack__message-header">
                      <span className="slack__message-sender">
                        <a
                          href={`https://loftph.slack.com/team/${user.id}`}
                          className="slack__message-sender-link"
                        >
                          {profile.display_name || profile.real_name_normalized}
                        </a>
                      </span>
                      <span className="slack__timestamp">
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

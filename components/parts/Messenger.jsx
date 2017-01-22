import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import * as Firebase from 'functions/firebase';

export default class Messenger extends Component {
  static propTypes = {
    roomName: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
  }

  constructor(props) {
    super(props);

    const { roomName } = props;

    this.ref = Firebase.getFirebaseInstance();

    // this.ref.fetch(`rooms/${roomName}/privateMessages`, {
    //   context: this,
    //   then: this.updatePrivateMessages,
    //   asArray: true,
    // });

    this.ref.fetch(`rooms/${roomName}/publicMessages`, {
      context: this,
      then: this.updatePublicMessages,
      asArray: true,
    });

    this.state = {
      privateMessages: {},
      publicMessages: [],
      inputField: '',
      privateView: false,
    };
  }

  getInitials(nameString) {
    const firstLast = nameString.split(' ');
    let initials;
    if (firstLast.length === 1) {
      initials = firstLast[0][0];
    } else {
      initials = `${firstLast[0].charAt(0)}${firstLast[firstLast.length - 1].charAt(0)}`;
    }
    return initials;
  }

  setChatChannel(channel) {
    this.setState({
      privateView: channel === 'private',
    });
  }

  updateMessage = (e) => {
    this.setState({
      inputField: e.target.value,
    });
  }

  updatePrivateMessages = (data) => {
    this.ref.syncState(`rooms/${this.props.roomName}/privateMessages`, {
      context: this,
      state: 'privateMessages',
    });
    this.setState({
      privateMessages: {
        [this.props.userId]: data,
      },
    });
  }

  updatePublicMessages = (data) => {
    this.ref.syncState(`rooms/${this.props.roomName}/publicMessages`, {
      context: this,
      state: 'publicMessages',
      asArray: true,
    });
    this.setState({
      publicMessages: data,
    });
  }

  sendMessage = () => {
    const time = Date.now();
    const content = this.state.inputField;
    const currMessage = [{
      content,
      time,
      read: false,
      author: this.props.userName,
      userId: this.props.userId,
    }];

    if (content === '') return;

    if (this.state.privateView) {
      this.setState({
        privateMessages: {
          [this.props.userId]: this.state.privateMessages[this.props.userId].concat(currMessage),
        },
      });
    } else {
      this.setState({
        publicMessages: this.state.publicMessages.concat(currMessage),
      });
    }
    this.setState({ inputField: '' });
  }

  checkKeys = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  componentDidUpdate() {
    const elem = document.getElementById("messagesContainer");
    elem.scrollTop = elem.scrollHeight;
  }

  renderMessages = (messages) => {
    const { userId } = this.props;

    if (messages === null) return <span className="loading" />;

    return messages.map((message, index) =>
      <div key={index} className={classNames('message', { 'from-me': userId === message.userId })}>
        <div className={classNames('author', 'tooltip', userId === message.userId ? 'tooltip-left' : 'tooltip-right')} data-tooltip={message.author}>
          <figure className="avatar avatar-md" data-initial={this.getInitials(message.author)} />
        </div>
        <div className="body tooltip" data-tooltip={moment(message.time).fromNow()}>
          <p>{message.content}</p>
        </div>
      </div>
    );
  }

  render() {
    const { publicMessages } = this.state;

    return (
      <div className="messenger">
        <div id="messagesContainer" className="messages">
          {this.renderMessages(publicMessages)}
        </div>
        <div className="input-group">
          <input className="text" className="form-input" placeholder="Send a message" onChange={this.updateMessage} onKeyPress={this.checkKeys} value={this.state.inputField} />
          <button className="btn btn-primary input-group-btn" onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

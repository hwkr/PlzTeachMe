import React, { Component, PropTypes } from 'react';

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

  setChatChannel(channel) {
    console.log(`Channel set to ${channel}`);
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
  }

  render() {
    const privateMessages = [];
    // const privateMessages = this.state.privateMessages === null ?
    //   <span className="loading" />
    // : this.state.privateMessages[this.props.userId].map((message, index) => <div key={index}>{message.content}</div>);
    const publicMessages = this.state.publicMessages === null ?
      <span className="loading" />
    : this.state.publicMessages.map((message, index) =>
      <div key={index} className="message">
        <div className="messageContent">{message.content}</div>
        <div className="messageTimestamp">{message.time}</div>
        <div className="messageAuthor">{message.author}</div>
      </div>
    );

    return (
      <div className="messenger">
        <button className="instructorChat" onClick={() => this.setChatChannel('private')} >Instructor</button>
        <button className="allChat" onClick={() => this.setChatChannel('public')} >Class</button>
        <div className="content">
          {this.state.privateView ? privateMessages : publicMessages}
        </div>
        <input onChange={this.updateMessage} type="text" placeholder="create a room" value={this.state.inputField} />
        <button onClick={this.sendMessage}>Send Message</button>
      </div>
    );
  }
}

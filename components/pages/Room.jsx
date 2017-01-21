import React, { Component, PropTypes } from 'react';
import * as Firebase from 'functions/firebase';
import uuidV4 from 'uuid/v4';

import Editor from 'components/editor/Editor';

export default class Room extends Component {
  static propTypes = {
    params: PropTypes.shape({
      roomName: PropTypes.string.isRequired,
      userId: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    const { roomName, userId } = this.props.params;

    this.ref = Firebase.getFirebaseInstance();

    this.ref.syncState(`rooms/${roomName}/${userId}/user`, {
      context: this,
      state: 'user',
    });

    this.state = {
      user: {
        userName: '',
      },
    };

    if (!this.props.params.userId) this.createUserId();
  }

  createUserId = () => {
    const { roomName } = this.props.params;
    const userId = uuidV4();
    this.ref.post(`rooms/${roomName}/${userId}`, {
      data: {
        user: {
          userName: '',
        },
        editorContent: {
          html: '',
          css: '',
          javascript: '',
        },
      },
    }).then(() => {
      window.history.pushState({}, 'Room', `${window.location.href}/${userId}`);
    }).catch(err => {
      // handle error
      console.error(err);
    });
  }

  changeName = (e) => {
    this.setState({
      user: {
        userName: e.target.value,
      },
    });
  }

  render() {
    const { roomName, userId } = this.props.params;
    const { userName } = this.state.user;
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-12">
            <input value={userName} type="text" placeholder="username" onChange={this.changeName} />
          </div>
        </div>
        <div className="columns">
          <div className="column col-12">
            <Editor userId={userId} roomName={roomName} />
          </div>
        </div>
      </div>
    );
  }
}

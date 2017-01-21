import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as Firebase from 'functions/firebase';
import uuidV4 from 'uuid/v4';

import Icon from 'parts/Icon';

import StudentView from 'views/StudentView';

export default class Room extends Component {
  static propTypes = {
    params: PropTypes.shape({
      roomName: PropTypes.string.isRequired,
      userId: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);

    this.ref = Firebase.getFirebaseInstance();

    this.state = {
      loading: true,
      roomExists: false,
      userExists: false,
    };

    this.checkRoom();
  }

  createUserId = () => {
    const { roomName } = this.props.params;
    const userId = uuidV4();
    this.ref.post(`rooms/${roomName}/users/${userId}`, {
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
      window.location.href = `/room/${roomName}/${userId}`;
    }).catch(err => {
      // handle error
      console.error(err);
    });
  }

  createRoom = () => {
    const { roomName } = this.props.params;
    this.ref.post(`rooms/${roomName}`, {
      data: {
        title: roomName,
        users: {},
      },
    }).then(() => {
      window.location.href = `/teach/${roomName}`;
    }).catch(err => {
      // handle error
      console.error(err);
    });
  }

  checkRoom = () => {
    const { roomName } = this.props.params;

    this.ref.fetch(`rooms/${roomName}`, {
      context: this,
      then: (room) => {
        if (room) {
          this.setState({ roomExists: true });
          this.checkUser();
        } else {
          this.setState({ loading: false, roomExists: false });
        }
      },
    });
  }

  checkUser = () => {
    const { userId, roomName } = this.props.params;
    if (userId) {
      this.ref.fetch(`rooms/${roomName}/users/${userId}`, {
        context: this,
        then: (user) => {
          if (user) {
            this.setState({ loading: false, userExists: true });
          } else {
            this.setState({ loading: false, userExists: false });
          }
        },
      });
    } else {
      this.createUserId();
    }
  }


  render() {
    const { roomName, userId } = this.props.params;
    const { loading, roomExists, userExists } = this.state;

    if (loading) {
      return (
        <div className="container">
          <div className="flex flex-center fill-page">
            <span className="loading loading-lg" />
          </div>
        </div>
      );
    } else if (roomExists && userExists) {
      return (
        <StudentView userId={userId} roomName={roomName} />
      );
    } else if (roomExists) {
      return (
        <div className="container">
          <div className="flex flex-center fill-page">
            <div className="col-md-12 col-6">
              <div className="empty">
                <Icon name="warning" />
                <p className="empty-title">User not Found</p>
                <p className="empty-meta">Hmm, we couldn't find that user in the room, <b>{roomName}</b>.</p>
                <a className="empty-action btn btn-primary" href={`/room/${roomName}`}>Create a new user in <b>{roomName}</b></a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="flex flex-center fill-page">
          <div className="col-md-12 col-6">
            <div className="empty">
              <Icon name="warning" />
              <p className="empty-title">Room not Found</p>
              <p className="empty-meta">We couldn't find the room, <b>{roomName}</b>.</p>
              <button className="empty-action btn btn-primary" onClick={this.createRoom}>
                Create <b>{roomName}</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import * as Firebase from 'functions/firebase';
import uuidV4 from 'uuid/v4';
import { Chance } from 'chance';

import StudentView from 'views/StudentView';

import RoomNotFound from 'pages/RoomNotFound';
import UserNotFound from 'pages/UserNotFound';
import Loading from 'pages/Loading';

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
    const chance = new Chance();
    this.ref.post(`rooms/${roomName}/users/${userId}`, {
      data: {
        user: {
          userName: `${chance.first()} ${chance.last()}`,
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
        <Loading />
      );
    } else if (roomExists && userExists) {
      return (
        <StudentView userId={userId} roomName={roomName} />
      );
    } else if (roomExists) {
      return (
        <UserNotFound roomName={roomName} />
      );
    }
    return (
      <RoomNotFound roomName={roomName} fireRef={this.ref} />
    );
  }
}

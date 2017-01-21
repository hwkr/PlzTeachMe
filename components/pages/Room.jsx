import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as Firebase from 'functions/firebase';
import uuidV4 from 'uuid/v4';
import { Chance } from 'chance';

import Icon from 'parts/Icon';

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
    const { roomName } = this.props.params;

    this.ref = Firebase.getFirebaseInstance();

    this.state = {
      roomExists: false,
      user: {
        userName: '',
      },
    };

    this.ref.fetch(`rooms/${roomName}`, {
      context: this,
      then: this.isRoom,
    });
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
      window.history.pushState({}, 'Room', `${window.location.href}/${userId}`);
    }).catch(err => {
      // handle error
      console.error(err);
    });
  }

  isRoom = (room) => {
    const { roomName, userId } = this.props.params;

    if (!room) {
      this.setState({ roomExists: false });
    } else {
      this.setState({ roomExists: true });
      if (!this.props.params.userId) {
        this.createUserId();
      } else {
        this.ref.syncState(`rooms/${roomName}/users/${userId}/user`, {
          context: this,
          state: 'user',
        });
      }
    }
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
    const { roomExists } = this.state;
    const { userName } = this.state.user;
    return (
      <div className="container">
        { roomExists ?
          <div>
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
        :
          <div className="flex flex-center fill-page">
            <div className="col-md-12 col-6">
              <div className="empty">
                <Icon name="warning" />
                <p className="empty-title">Room not Found</p>
                <p className="empty-meta">Hmmm, that's not good.</p>
                <Link className="empty-action btn btn-primary" to="/">Go home</Link>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

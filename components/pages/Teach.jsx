import React, { Component, PropTypes } from 'react';

import Editor from 'editor/Editor';
import InstructorSidebarController from 'controllers/InstructorSidebarController';

import RoomNotFound from 'pages/RoomNotFound';
import Loading from 'pages/Loading';

import * as Firebase from 'functions/firebase';

export default class Home extends Component {
  static propTypes = {
    params: PropTypes.shape({
      roomName: PropTypes.string.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();

    this.checkRoom();

    this.state = {
      loading: true,
      users: null,
      activeStudentIndex: -1,
    };
  }

  checkRoom() {
    const { roomName } = this.props.params;
    this.ref.fetch(`rooms/${roomName}`, {
      context: this,
      then: (room) => {
        if (room) {
          this.setState({ loading: false, roomExists: true });
        } else {
          this.setState({ loading: false, roomExists: false });
        }
      },
    });
  }

  // static defaultProps = {
  // }

  render() {
    const { roomName } = this.props.params;
    const { loading, roomExists } = this.state;

    if (loading) {
      return (
        <Loading />
      );
    } else if (roomExists) {
      return (
        <div className="teach">
          <InstructorSidebarController {...this.props} />
          <main className="view">
            <div className="container">
              <div className="columns">
                <div className="column col-12">
                  <Editor />
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
    return (
      <RoomNotFound roomName={roomName} fireRef={this.ref} />
    );
  }
}

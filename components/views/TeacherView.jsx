import React, { Component, PropTypes } from 'react';
import * as Firebase from 'functions/firebase';

// import Icon from 'parts/Icon';

import Editor from 'components/editor/Editor';
import Messenger from 'parts/Messenger';

export default class TeacherView extends Component {
  static propTypes = {
    roomName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.ref = Firebase.getFirebaseInstance();

    this.state = {
      user: {
        userName: '',
      },
    };
  }

  componentDidMount() {
    const { roomName, userId } = this.props;

    this.unmountRef = this.ref.syncState(`rooms/${roomName}/users/${userId}/user`, {
      context: this,
      state: 'user',
    });
  }

  componentWillReceiveProps(nextProps) {
    const { roomName, userId } = nextProps;

    this.ref.removeBinding(this.unmountRef);

    this.unmountRef = this.ref.syncState(`rooms/${roomName}/users/${userId}/user`, {
      context: this,
      state: 'user',
    });
  }

  componentWillUnmount() {
    this.ref.removeBinding(this.unmountRef);
  }

  render() {
    const { roomName, userId } = this.props;
    const { userName } = this.state.user;

    return (
      <div className="container">
        <div className="columns">
          <div className="column col-12">
            <h4>
              Helping <b>{userName}</b>.
            </h4>
          </div>
        </div>
        <div className="columns">
          <div className="column col-12">
            <Editor editorPath={`rooms/${roomName}/users/${userId}/editorContent`} />
          </div>
        </div>
        <Messenger userId={'Instructor'} userName={'Instructor'} roomName={roomName} />
      </div>
    );
  }
}

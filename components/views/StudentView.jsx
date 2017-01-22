import React, { Component, PropTypes } from 'react';
import * as Firebase from 'functions/firebase';

// import Icon from 'parts/Icon';

import Editor from 'components/editor/Editor';

export default class StudentView extends Component {
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

  componentDidMount = () => {
    const { roomName, userId } = this.props;

    this.ref.syncState(`rooms/${roomName}/users/${userId}/user`, {
      context: this,
      state: 'user',
    });
  }

  changeName = (e) => {
    this.setState({ user: { userName: e.target.value } });
  }

  render() {
    const { roomName, userId } = this.props;
    const { userName } = this.state.user;

    return (
      <div className="container student-view">
        <div className="columns">
          <div className="column col-12">
            <h4 className="student-name">
              <span>Joined as</span>
              <input className="form-input input-lg" value={userName} type="text" placeholder="username" onChange={this.changeName} />
            </h4>
          </div>
        </div>
        <div className="columns">
          <div className="column col-12">
            <Editor editorPath={`rooms/${roomName}/users/${userId}/editorContent`} />
          </div>
        </div>
      </div>
    );
  }
}

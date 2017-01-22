import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from 'parts/Icon';

import * as Firebase from 'functions/firebase';

const avatarA = require('img/avatars/avatar-a.png');
const avatarB = require('img/avatars/avatar-b.png');
// const avatarC = require('img/avatars/avatar-c.png');
const avatarD = require('img/avatars/avatar-d.png');

export default class InstructorSidebarController extends Component {
  static propTypes = {
    params: PropTypes.shape({
      roomName: PropTypes.string.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();
    const { roomName } = props.params;

    this.ref.syncState(`rooms/${roomName}/users`, {
      context: this,
      state: 'users',
    });

    this.ref.fetch(`rooms/${roomName}/users`, {
      context: this,
      then: this.updateUsers,
    });

    this.state = {
      users: null,
      activeStudentIndex: -1,
    };
  }

  // static defaultProps = {
  // }

  updateUsers = (data) => {
    this.setState({
      users: data,
    });
  }

  makeActive = (index) => {
    this.setState({
      activeStudentIndex: index,
    });
  }

  render() {
    const Sidebar = this.state.users == null ?
      <span className="loading" />
      :
      Object.keys(this.state.users).map((user, index) =>
        <li key={index} className={classNames('tab-item', 'tab-student', { active: index === this.state.activeStudentIndex })} >
          <button onClick={() => this.makeActive(index)} className="badge" data-badge="3">
            <figure className="avatar avatar-md" data-initial="A">
              <img src={avatarA} alt="avatar" />
            </figure>
          </button>
        </li>
      );
    return (
      <div className="sidebar">
        <ul className="tab tab-side">
          <li className="tab-item tab-teacher">
            <button onClick={() => this.makeActive(-1)}>
              <figure className="avatar avatar-md">
                <Icon name="group" />
              </figure>
            </button>
          </li>
          {Sidebar}
        </ul>
      </div>
    );
  }
}

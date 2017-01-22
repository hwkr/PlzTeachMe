import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from 'parts/Icon';

import GroupView from 'views/GroupView';
import TeacherView from 'views/TeacherView';

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
      roomExists: false,
      users: null,
      activeUser: -1,
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

  getUsers(roomName) {
    this.ref.syncState(`rooms/${roomName}/users`, {
      context: this,
      state: 'users',
      asArray: true,
    });

    this.ref.fetch(`rooms/${roomName}/users`, {
      context: this,
      then: this.updateUsers,
    });
  }

  checkRoom() {
    const { roomName } = this.props.params;
    this.ref.fetch(`rooms/${roomName}`, {
      context: this,
      then: (room) => {
        if (room) {
          this.setState({ loading: false, roomExists: true });
          this.getUsers(roomName);
        } else {
          this.setState({ loading: false, roomExists: false });
        }
      },
    });
  }

  updateUsers = (data) => {
    this.setState({
      users: data,
    });
  }

  makeActive = (index) => {
    this.setState({
      activeUser: index,
    });
  }

  render() {
    const { roomName } = this.props.params;
    const { loading, roomExists, users, activeUser } = this.state;

    if (loading) {
      return (
        <Loading />
      );
    } else if (roomExists) {
      return (
        <div className="teach">
          <div className="sidebar">
            <ul className="tab tab-side">
              <li className={classNames('tab-item', 'tab-teacher', 'tooltip', 'tooltip-right', { active: activeUser === -1 })} data-tooltip="Group">
                <button onClick={() => this.makeActive(-1)}>
                  <figure className="avatar avatar-md">
                    <Icon name="group" />
                  </figure>
                </button>
              </li>
              {users == null ?
                <span className="loading" />
                :
                users.map((user, index) =>
                  <li key={index} className={classNames('tab-item', 'tab-student', 'tooltip', 'tooltip-right', { active: index === activeUser })} data-tooltip={user.user.userName}>
                    <button onClick={() => this.makeActive(index)} className="badge" data-badge="3">
                      <figure className="avatar avatar-md" data-initial={this.getInitials(user.user.userName)} />
                    </button>
                  </li>
                )
              }
            </ul>
          </div>
          <main className="view">
            {activeUser === -1 ?
              <GroupView roomName={roomName} />
            :
              <TeacherView roomName={roomName} userId={users[activeUser].key} />
            }
          </main>
        </div>
      );
    }
    return (
      <RoomNotFound roomName={roomName} fireRef={this.ref} />
    );
  }
}

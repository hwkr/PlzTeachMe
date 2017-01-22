import React, { Component } from 'react';
import classnames from 'classnames';

import * as Firebase from 'functions/firebase';

import Navbar from 'parts/Navbar';

export default class Home extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();
    this.state = {
      isRoomNameAvailable: false,
      roomName: '',
    };
  }

  // static defaultProps = {
  // }

  createRoom = () => {
    const { roomName } = this.state;
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

  roomNameChange = (e) => {
    const val = e.target.value;
    this.setState({ roomName: val });

    this.ref.fetch(`rooms/${val}`, {
      context: this,
      then: (room) => { this.setState({ isRoomNameAvailable: room == null }); },
    });
  }


  render() {
    const { roomName, isRoomNameAvailable } = this.state;
    return (
      <div className="home">

        {/* Header */}
        <Navbar />
        <div className="container">
          <div className="hero">
            <div className="col-md-12 col-8">
              <p className="cta">
                Pair program with me. Join a room and start learning.
              </p>
            </div>
            <div className="col-md-12 col-6">
              <div className="input-group">
                <span className="input-group-addon addon-lg">plzteach.me/room/</span>
                <input type="text" className="form-input input-lg" placeholder="Room Name" value={roomName} onChange={this.roomNameChange} />
                <button className={classnames('btn', 'btn-primary', 'btn-lg', 'input-group-btn', { disabled: isRoomNameAvailable })} onChange={this.checkName}>Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



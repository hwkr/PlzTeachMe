import React, { Component } from 'react';
import classnames from 'classnames';

import * as Firebase from 'functions/firebase';

import Navbar from 'parts/Navbar';
import Footer from 'parts/Footer';

export default class Home extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();
    this.state = {
      roomExists: false,
      roomName: '',
      userName: '',
    };
  }

  // static defaultProps = {
  // }

  joinRoom = () => {
    const { roomName, userName } = this.state;
    window.location.href = `/room/${roomName}?userName=${userName}`;
  }

  roomNameChange = (e) => {
    const val = e.target.value;
    this.setState({ roomName: val });

    this.ref.fetch(`rooms/${val}`, {
      context: this,
      then: (room) => { this.setState({ roomExists: room !== null }); },
    });
  }

  userNameChange = (e) => {
    const val = e.target.value;
    this.setState({ userName: val });
  }

  render() {
    const { roomName, userName, roomExists } = this.state;
    const isValid = roomExists && userName !== '';
    return (
      <div className="home fill-page">

        {/* Header */}
        <Navbar />
        {/* Main Content */}
        <div className="container">
          <div className="hero">
            <div className="col-md-12 col-8">
              <p className="cta">
                Pair program with me. Join a room and start learning.
              </p>
            </div>
            <div className="col-md-12 col-8">
              <div className={classnames('input-group', { tooltip: !roomExists && roomName !== '' }, 'tooltip-bottom')} data-tooltip="Uh oh! We can't find that room  &#x1F631;">
                <span className="input-group-addon addon-lg">plzteach.me/room/</span>
                <input type="text" className="form-input input-lg" placeholder="Room Name" value={roomName} onChange={this.roomNameChange} />
                <span className="input-group-addon addon-lg">?userName=</span>
                <input type="text" className="form-input input-lg" placeholder="Your Name" value={userName} onChange={this.userNameChange} />
                <button className={classnames({ disabled: !isValid }, 'btn', 'btn-primary', 'btn-lg', 'input-group-btn')} onClick={this.joinRoom}>Join</button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

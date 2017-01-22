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
    };
  }

  // static defaultProps = {
  // }

  joinRoom = () => {
    const { roomName } = this.state;
    window.location.href = `/room/${roomName}`;
  }

  roomNameChange = (e) => {
    const val = e.target.value;
    this.setState({ roomName: val });

    this.ref.fetch(`rooms/${val}`, {
      context: this,
      then: (room) => { this.setState({ roomExists: room !== null }); },
    });
  }

  render() {
    const { roomName, roomExists } = this.state;
    return (
      <div className="home">

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
            <div className="col-md-12 col-6">
              <div className={classnames('input-group', { tooltip: roomName !== '' }, 'tooltip-bottom')} data-tooltip={roomExists ? 'Good dank name!' : 'Uh oh! We can\'t find that room  &#x1F631'}>
                <span className="input-group-addon addon-lg">plzteach.me/room/</span>
                <input type="text" className="form-input input-lg" placeholder="Room Name" value={roomName} onChange={this.roomNameChange} />
                <button className={classnames({ disabled: !roomExists }, 'btn', 'btn-primary', 'btn-lg', 'input-group-btn')} onClick={this.joinRoom}>Join</button>
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



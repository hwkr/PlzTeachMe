import React, { Component } from 'react';

import Config from 'Config';

import * as Firebase from 'functions/firebase';

import Icon from 'parts/Icon';

export default class Home extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();
    this.ref.syncState('rooms', {
      context: this,
      state: 'rooms',
      asArray: true,
    });
    // Firebase.getRooms(this, this.setRooms);
    this.state = {
      isAvailable: true,
      inputValue: '',
    };
  }

  setRooms = (data) => {
    this.setState({
      rooms: data,
    });
  }

  createRoom = () => {
    Firebase.createRoom(this.state.inputValue);
  }

  // static defaultProps = {
  // }

  checkName = (e) => {
    const inputValue = e.target.value;
    const matches = this.state.rooms.filter((item) => item.name === inputValue);
    this.setState({
      isAvailable: matches.length === 0,
      inputValue,
    });
  }

  render() {
    return (
      <div className="home">
        <div className="container">
          <div className="columns">
            <div className="column col-12 text-center">
              <h1>Welcome</h1>
            </div>
            <div className="column col-12 text-center">
              <div>
                <span> plzteach.me/room/</span>
                <input type="text" placeholder="room name" onChange={this.checkName} />
              </div>
              {this.state.isAvailable ?
                <button onClick={this.createRoom} >Create Room</button>
                : <button disabled>Create Room</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



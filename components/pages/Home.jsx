import React, { Component } from 'react';
import classnames from 'classnames';

// import Config from 'Config';

import * as Firebase from 'functions/firebase';

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
        instructor: {
          editorContent: {
            html: '',
            css: '',
            javascript: '',
          },
        },
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

        <header className="navbar">
          <section className="navbar-section">
            <a href="#" className="navbar-brand">
              <img className="brandLogo" src="../../img/logo/logoFull.svg" alt="Branc Logo"/>
            </a>
          </section>
          <section>
            <a href="#" target="_blank">
              <i></i>
            </a>
            <a href="#" target="_blank">
              <i></i>
            </a>
          </section>
        </header>


        {/* Welcome Message */}
        <div className="container">
          <div className="columns">
            <div className="column col-12 text-center">
              <h1 className="homeTitle">
                Welcome
              </h1>
            </div>
          </div>
        </div>
        {/* Input Bar */}
        <div className="flex-container container">
          <div className="columns">
            <div className="row column col-6">
              <div className="flex-item">
                <div className="input-group homeBox">
                  <span className="input-group-addon addon-lg">plzteach.me/room/</span>
                  <input type="text" className="form-input input-lg homeInput" placeholder="Room Name" value={ roomName } onChange={this.roomNameChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start Plz Button */}
        <div className="flex-container container">
          <div className="columns">
            <div className="row column col-6">
              <div className="flex-item">
                <button className={classnames('btn', 'btn-home', 'input-group-btn', { disabled: !isRoomNameAvailable })} onClick={this.createRoom}>Start Plz</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



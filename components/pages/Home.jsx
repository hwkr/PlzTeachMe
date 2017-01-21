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
    });
    // Firebase.getRooms(this, this.setRooms);
    this.state = {
      isAvailable: true,
      inputValue: '',
    };
  }

  setRooms = () => {
    this.setState({
      [this.state.inputValue]: true,
    });
  }

  createRoom = () => {
    Firebase.createRoom(this.state.inputValue);
  }

  // static defaultProps = {
  // }

  checkName = (e) => {
    const inputValue = e.target.value;
    const matches = Object.keys(this.state.rooms).filter((key) => key === inputValue);
    this.setState({
      isAvailable: matches.length === 0,
      inputValue,
    });
  }


  render() {
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
                  <input type="text" className="form-input input-lg homeInput" placeholder="site name" onChange={this.checkName} />
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
                {this.state.isAvailable ?
                  <button className="btn btn-home input-group-btn" onChange={this.setRooms}>Start Plz</button>
                : <button className="btn btn-home input-group-btn" onChange={this.setRooms} disabled>Start Plz</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



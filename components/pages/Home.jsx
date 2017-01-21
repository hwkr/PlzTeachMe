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
    const matches = this.state.rooms.filter((item) => item.key === inputValue);
    this.setState({
      isAvailable: matches.length === 0,
      inputValue,
    });
  }


  render() {
    return (
      <div className="home">

        {/* Header */}
        <header className="navbar">
          <section className="navbar-section">
            <a href="#" className="navbar-brand">
              <img className="brandLogo" src="../../img/logo/logoFull.svg" alt="Branc Logo"/>
            </a>
          </section>
          <section className="navbar-section">
            <div className="input-group input-inline">
              <a className="btn btn-link" href="#" target="_blank">
                <Icon name="social-facebook"/>
                Facebook
              </a>
              <a className="btn btn-link" href="#" target="_blank">
                <Icon name="social-twitter"/>
                Twitter
              </a>
              <a className="btn btn-link" href="#" target="_blank">
                <Icon name="social-github"/>
                Github
              </a>
            </div>
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
        <div className="container">
          <div className="columns">
            <div className="column col-6">
              <div className="input-group homeBox">
                <span className="input-group-addon addon-lg">plzteach.me/room/</span>
                <input type="text" className="form-input input-lg homeInput" placeholder="site name" onChange={this.checkName} />
              </div>
            </div>
          </div>
        </div>
        {/* Start Plz Button */}
        <div className="container">
          <div className="columns">
            <div className="column col-6">
              {this.state.isAvailable ?
                <button className="btn btn-home input-group-btn" onChange={this.checkName}>Start Plz</button>
              : <button className="btn btn-home input-group-btn" onChange={this.checkName} disabled>Start Plz</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



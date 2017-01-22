import React, { Component /* , PropTypes */ } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import * as Firebase from 'functions/firebase';

import Icon from 'parts/Icon';
import Config from 'Config';

import brand from 'img/logo/logoFull.svg';

export default class Head extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);

    this.ref = Firebase.getFirebaseInstance();

    this.state = {
      roomExists: true,
      roomName: '',
    };
  }

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
      then: (room) => { this.setState({ roomExists: room !== null }); },
    });
  }

  render() {
    const { roomName, roomExists } = this.state;
    return (
      <header className="navbar">
        <section className="navbar-section">
          <Link to="/" className="navbar-brand">
            <img className="brand" src={brand} alt="Branc Logo" />
          </Link>
          <div className="input-group input-inline">
            {
              Config.social.map((link) =>
                <a key={link.href} className="btn btn-link" href={link.href} target="_blank" rel="noopener noreferrer">
                  <Icon name={link.icon} />
                  <span>{link.label}</span>
                </a>
              )
            }
          </div>
        </section>
        <section className="navbar-section">
          <div className={classnames('input-group', 'input-inline', { tooltip: roomExists && roomName !== '' }, 'tooltip-bottom')} data-tooltip="Oh no! That room already exists &#x1F61E;">
            <input className="form-input" type="text" placeholder="create a room" value={roomName} onChange={this.roomNameChange} />
            <button className={classnames('btn', 'btn-primary', 'input-group-btn', { disabled: roomExists || roomName === '' })} onClick={this.createRoom}>Create</button>
          </div>
        </section>
      </header>
    );
  }
}

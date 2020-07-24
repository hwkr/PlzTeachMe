import React, { Component /* , PropTypes */ } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import * as Firebase from 'functions/firebase';

import brand from 'img/iconWhite.svg';

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

  createRoom = (e) => {
    e.preventDefault();
    const { roomName, roomExists } = this.state;
    if (roomExists) return;

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
        messages: {},
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
      then: (room) => {
        const isEmpty = Object.keys(room).length === 0 || !room;
        this.setState({ roomExists: !isEmpty });
      },
    });
  }

  render() {
    const { roomName, roomExists } = this.state;
    return (
      <header className="navbar">
        <section className="navbar-section">
          <Link to="/" className="navbar-brand">
            <img className="brand" src={brand} alt="Brand Logo" />
          </Link>
        </section>
        <section className="navbar-section">
          <form className={classnames('input-group', 'input-inline', { tooltip: roomName !== '' }, 'tooltip-bottom')} data-tooltip={roomExists ? 'Oh no! That room already exists 😞' : 'Sweet name! 👍'} onSubmit={this.createRoom}>
            <input className="form-input" type="text" placeholder="create a room" value={roomName} onChange={this.roomNameChange} />
            <button className={classnames('btn', 'btn-primary', 'input-group-btn', { disabled: roomExists || roomName === '' })} type="submit">Create</button>
          </form>
        </section>
      </header>
    );
  }
}

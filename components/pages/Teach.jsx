import React, { Component } from 'react';

import Icon from 'parts/Icon';

const avatarA = require('img/avatars/avatar-a.png');
const avatarB = require('img/avatars/avatar-b.png');
const avatarC = require('img/avatars/avatar-c.png');
const avatarD = require('img/avatars/avatar-d.png');

export default class Home extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // static defaultProps = {
  // }

  render() {
    return (
      <div className="teach">
        <div className="sidebar">
          <ul className="tab tab-side">
            <li className="tab-item">
              <a href="#a" className="badge" data-badge="3">
                <figure className="avatar avatar-md" data-initial="A">
                  <img src={avatarA} alt="avatar" />
                </figure>
              </a>
            </li>
            <li className="tab-item active">
              <a href="#b">
                <figure className="avatar avatar-md" data-initial="B">
                  <img src={avatarB} alt="avatar" />
                </figure>
              </a>
            </li>
            <li className="tab-item">
              <a href="#c" className="badge" data-badge="1">
                <figure className="avatar avatar-md" data-initial="C" />
              </a>
            </li>
            <li className="tab-item">
              <a href="#d">
                <figure className="avatar avatar-md" data-initial="D">
                  <img src={avatarD} alt="avatar" />
                </figure>
              </a>
            </li>
          </ul>
        </div>
        <main className="view">
          <div className="container text-center">
            <a className="btn">Teaching! <Icon name="group" /></a><br /><br />
            <a className="btn btn-link">Teaching! <Icon name="group" /></a><br /><br />
            <a className="btn btn-primary">Teaching! <Icon name="group" /></a><br /><br />
            <a className="btn btn-primary loading">Teaching! <Icon name="group" /></a>
          </div>
        </main>
      </div>
    );
  }
}

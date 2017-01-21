import React, { Component } from 'react';

import Editor from 'editor/Editor';
import Icon from 'parts/Icon';

const avatarA = require('img/avatars/avatar-a.png');
const avatarB = require('img/avatars/avatar-b.png');
// const avatarC = require('img/avatars/avatar-c.png');
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
            <li className="tab-item tab-teacher">
              <a href="#teacher">
                <figure className="avatar avatar-md">
                  <Icon name="group" />
                </figure>
              </a>
            </li>
            <li className="tab-item tab-student">
              <a href="#a" className="badge" data-badge="3">
                <figure className="avatar avatar-md" data-initial="A">
                  <img src={avatarA} alt="avatar" />
                </figure>
              </a>
            </li>
            <li className="tab-item tab-student active">
              <a href="#b">
                <figure className="avatar avatar-md" data-initial="B">
                  <img src={avatarB} alt="avatar" />
                </figure>
              </a>
            </li>
            <li className="tab-item tab-student">
              <a href="#c" className="badge" data-badge="1">
                <figure className="avatar avatar-md" data-initial="C" />
              </a>
            </li>
            <li className="tab-item tab-student">
              <a href="#d">
                <figure className="avatar avatar-md" data-initial="D">
                  <img src={avatarD} alt="avatar" />
                </figure>
              </a>
            </li>
          </ul>
        </div>
        <main className="view">
          <div className="container">
            <div className="columns">
              <div className="column col-12">
                <Editor />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

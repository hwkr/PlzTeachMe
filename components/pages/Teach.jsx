import React, { Component } from 'react';

import Icon from 'parts/Icon';

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
            <li className="tab-item active">
              <a href="#a">A</a>
            </li>
            <li className="tab-item">
              <a href="#b">B</a>
            </li>
            <li className="tab-item">
              <a href="#c">C</a>
            </li>
            <li className="tab-item">
              <a href="#d">D</a>
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

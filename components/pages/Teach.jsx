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
        <div className="container">
          <div className="columns">
            <div className="column col-12 text-center">
              <a className="btn">Teaching! <Icon name="group" /></a><br /><br />
              <a className="btn btn-link">Teaching! <Icon name="group" /></a><br /><br />
              <a className="btn btn-primary">Teaching! <Icon name="group" /></a><br /><br />
              <a className="btn btn-primary loading">Teaching! <Icon name="group" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
              <h1>
                Teaching!
                <Icon name="group" />
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

import Config from 'Config';

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
      <div className="home">
        <div className="container">
          <div className="columns">
            <div className="column col-12 text-center">
              <h1>
                Welcome    
              </h1>
            </div>
            <div className="column col-12 text-center">
              <div class="input-group">
                  <span class="input-group-addon">plzteach.me/room/</span>
                  <input type="text" class="form-input" placeholder="site name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

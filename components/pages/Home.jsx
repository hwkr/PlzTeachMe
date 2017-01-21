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
              <h1 className="homeTitle">
                Welcome    
              </h1>
            </div>
          </div>
        </div>
        <div className="flex-container container">
          <div className="columns">
            <div className="row column col-6">
              <div className="flex-item">
                <div className="input-group">
                  <span className="input-group-addon addon-lg">plzteach.me/room/</span>
                  <input type="text" className="form-input input-lg homeInput" placeholder="site name" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-container container">
          <div className="columns">
            <div className="row column col-6">
              <div className="flex-item">
                <button className="btn btn-home input-group-btn">Start Plz</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component /* , PropTypes */ } from 'react';

import * as Firebase from 'functions/firebase';

import Icon from 'parts/Icon';
import Config from 'Config';

export default class Home extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();
    this.state = {
      roomExists: false,
      roomName: '',
    };
  }

  render() {
    return (
      <footer>
        <div className="input-group input-inline">
          {
            Config.social.map((link) =>
              <a key={link.href} className="btn btn-link tooltip tooltip-top" data-tooltip={link.tooltip} href={link.href} target="_blank" rel="noopener noreferrer">
                <Icon name={link.icon} />
                <span>{link.label}</span>
              </a>
            )
          }
        </div>
      </footer>
    );
  }
}

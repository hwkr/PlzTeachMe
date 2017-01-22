import React, { Component /* , PropTypes */ } from 'react';
import { Link } from 'react-router';

import Icon from 'parts/Icon';
import Config from 'Config';

const brand = require('img/logo/logoFull.svg');

export default class Head extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <header className="navbar">
        <section className="navbar-section">
          <Link to="/" className="navbar-brand">
            <img className="brand" src={brand} alt="Branc Logo" />
          </Link>
          <div className="input-group input-inline">
            {
              Config.social.map((link) =>
                <a className="btn btn-link" href={link.href} target="_blank" rel="noopener noreferrer">
                  <Icon name={link.icon} />
                  <span>{link.label}</span>
                </a>
              )
            }
          </div>
        </section>
        <section className="navbar-section">
          <div className="input-group input-inline">
            <input className="form-input" type="text" placeholder="create a room" />
            <button className="btn btn-primary input-group-btn">Create</button>
          </div>
        </section>
      </header>
    );
  }
}

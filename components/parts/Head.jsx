import React, { Component /* , PropTypes */ } from 'react';
import Helmet from 'react-helmet';

import Config from 'Config';

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
      <Helmet
        titleTemplate={`%s – ${Config.title}`}
        defaultTitle={Config.title}
      />
    );
  }
}

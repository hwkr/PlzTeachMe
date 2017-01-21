import React, { Component, PropTypes } from 'react';

import Head from 'parts/Head';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    routes: PropTypes.array.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Head />
        {this.props.children}
      </div>
    );
  }
}

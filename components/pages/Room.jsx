import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ExampleComponent extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

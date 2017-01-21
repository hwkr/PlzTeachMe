import React, { Component, PropTypes } from 'react';

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
      <div className="liveView">
        Hello
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';

export default class Preview extends Component {
  static propTypes = {
    content: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="preview" dangerouslySetInnerHTML={{ __html: this.props.content }} />
    );
  }
}

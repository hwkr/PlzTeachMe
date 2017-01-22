import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // static defaultProps = {
  // }

  render() {
    return (
      <i className={`icon plz plz-${this.props.name}`} style={{ fontSize: `${this.props.size}em` }} />
    );
  }
}
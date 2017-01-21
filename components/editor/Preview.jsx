import React, { PropTypes } from 'react';

export default class Preview extends React.Component {
  static propTypes = {
    content: PropTypes.any,
  }

  render() {
    return (
      <div className="preview" dangerouslySetInnerHTML={{ __html: this.props.content }} />
    );
  }
}

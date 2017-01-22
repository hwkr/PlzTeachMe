import React, { Component, PropTypes } from 'react';

// import Icon from 'parts/Icon';

import Editor from 'components/editor/Editor';

export default class GroupView extends Component {
  static propTypes = {
    roomName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { roomName } = this.props;

    return (
      <div className="container">
        <div className="columns">
          <div className="column col-12">
            Hello
          </div>
        </div>
        <div className="columns">
          <div className="column col-12">
            <Editor editorPath={`rooms/${roomName}/instructor/editorContent`} />
          </div>
        </div>
      </div>
    );
  }
}

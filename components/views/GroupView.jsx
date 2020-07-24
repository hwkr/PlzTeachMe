import React, { Component, PropTypes } from 'react';

import Messenger from 'parts/Messenger';

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
            <h4>Group</h4>
          </div>
        </div>
        <div className="columns">
          <div className="column col-9">
            <Editor editorPath={`rooms/${roomName}/instructor/editorContent`} previewUrl={`/room/${roomName}/instructor/preview`} />
          </div>
          <div className="column col-3">
            <Messenger userId="Instructor" userName="Instructor" roomName={roomName} />
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import Editor from 'components/editor/Editor';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Editor />
      </div>
    );
  }
}

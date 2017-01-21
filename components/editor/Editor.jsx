import React from 'react';

import TextEditor from './TextEditor';
import Preview from './Preview';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div className="editorContainer">
          <TextEditor mode="html" />
          <TextEditor mode="css" />
          <TextEditor mode="javascript" />
        </div>
        <div className="liveViewContainer">
          <Preview />
        </div>
      </div>
    );
  }
}

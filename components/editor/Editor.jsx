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
      <div className="editor columns">
        <div className="editor-text-editors column col-4">
          <TextEditor mode="html" />
          <TextEditor mode="css" />
          <TextEditor mode="javascript" />
        </div>
        <div className="editor-preview column col-8">
          <Preview />
        </div>
      </div>
    );
  }
}

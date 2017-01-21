import React, { Component, PropTypes } from 'react';
import Editor from '../Editor';
import LiveView from '../LiveView';

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
    const baseOptions = {
      lineNumbers: true,
    };
    return (
      <div>
        <div className="editorContainer">
          <Editor options={Object.assign({ mode: 'html' }, baseOptions)} />
          <Editor options={Object.assign({ mode: 'css' }, baseOptions)} />
          <Editor options={Object.assign({ mode: 'javascript' }, baseOptions)} />
        </div>
        <div className="liveViewContainer">
          <LiveView />
        </div>
      </div>
    );
  }
}

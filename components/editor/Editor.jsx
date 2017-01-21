import React from 'react';

import * as Firebase from 'functions/firebase';

import TextEditor from './TextEditor';
import Preview from './Preview';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();
    this.roomName = window.location.pathname.replace('/room/', '');
    this.ref.syncState(`editors/${this.roomName}/`, {
      context: this,
      state: 'content',
    });
    this.state = {
      content: {
        html: '// HTML',
        css: '// CSS',
        javascript: '// Javascript',
      },
    };
  }

  setHtml = (content) => {
    this.setState({
      content: {
        html: content,
      },
    });
  }

  setCss = (content) => {
    this.setState({
      content: {
        css: content,
      },
    });
  }

  setJavascript = (content) => {
    this.setState({
      content: {
        javascript: content,
      },
    });
  }

  render() {
    return (
      <div>
        <div className="editorContainer">
          <TextEditor mode="html" content={this.state.content.html} onChange={this.setHtml} />
          <TextEditor mode="css" content={this.state.content.css} onChange={this.setCss} />
          <TextEditor mode="javascript" content={this.state.content.javascript} onChange={this.setJavascript} />
        </div>
        <div className="liveViewContainer">
          <Preview />
        </div>
      </div>
    );
  }
}

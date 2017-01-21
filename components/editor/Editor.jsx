import React, { PropTypes } from 'react';

import * as Firebase from 'functions/firebase';

import Icon from 'parts/Icon';
import frame from 'parts/Frame';

import TextEditor from './TextEditor';
import Preview from './Preview';

function generateCombinedHtml(content) {
  return (
    `
      <script>${content.javascript}</script>
      <style>${content.css}</style>
      <div>${content.html}</div>
    `
  );
}

export default class Editor extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    roomName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();

    this.ref.syncState(`rooms/${this.props.roomName}/${this.props.userId}/editorContent`, {
      context: this,
      state: 'content',
    });

    this.state = {
      loading: false,
      content: {
        html: '',
        css: '',
        javascript: '',
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
    const { loading, content } = this.state;
    const PreviewFrame = frame(Preview);
    return (
      <div className="editor columns">
        <div className="editor-text-editors column col-4">
          <TextEditor mode="html" content={content.html} onChange={this.setHtml} />
          <TextEditor mode="css" content={content.css} onChange={this.setCss} />
          <TextEditor mode="javascript" content={content.javascript} onChange={this.setJavascript} />
        </div>
        <div className="editor-preview column col-8">
          { loading ?
            <div className="empty">
              <Icon name="flash" />
              <p className="empty-title">Preview Loading</p>
              <p className="empty-meta"><span className="loading">Loading...</span></p>
            </div>
            :
            <PreviewFrame content={generateCombinedHtml(content)} />
          }
        </div>
      </div>
    );
  }
}

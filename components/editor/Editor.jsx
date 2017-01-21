import React, { PropTypes } from 'react';

import * as Firebase from 'functions/firebase';

import TextEditor from './TextEditor';
import Preview from './Preview';

function generateCombinedHtml(content) {
  return (
    `
      <script>${eval(content.javascript)}</script>
      <style>${content.css}</style>
      <div>${content.html}</div>
    `
  );
}

export default class Editor extends React.Component {
  static propTypes = {
    userID: PropTypes.string,
    userName: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();
    this.roomName = window.location.pathname.replace('/room/', '');
    this.ref.syncState(`rooms/${this.roomName}/${this.props.userID}`, {
      context: this,
      state: 'content',
    });
    this.state = {
      content: {
        html: '',
        css: '',
        javascript: '',
        userName: '',
      },
    };
    this.setInitialState();
  }

  componentWillReceiveProps = (nextProps) => {
    this.timeSafeSetState({
      content: {
        userName: nextProps.userName,
      },
    });
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

  setInitialState = () => {
    this.setState({
      content: {
        html: '',
        css: '',
        javascript: '',
        userName: this.props.userName,
      },
    });
  }

  inputTimeout = null;

  timeSafeSetState = (state) => {
    if (this.inputTimeout != null) {
      clearTimeout(this.inputTimeout);
    }
    this.inputTimeout = setTimeout(() => {
      this.setState(state);
    }, 300);
  }

  render() {
    return (
      <div className="editor columns">
        <div className="editor-text-editors column col-4">
          <TextEditor mode="html" content={this.state.content.html} onChange={this.setHtml} />
          <TextEditor mode="css" content={this.state.content.css} onChange={this.setCss} />
          <TextEditor mode="javascript" content={this.state.content.javascript} onChange={this.setJavascript} />
        </div>
        <div className="editor-preview column col-8">
          <Preview content={generateCombinedHtml(this.state.content)} />
        </div>
      </div>
    );
  }
}

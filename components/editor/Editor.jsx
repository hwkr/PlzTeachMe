import React, { PropTypes } from 'react';

import * as Firebase from 'functions/firebase';

import Icon from 'parts/Icon';
import frame from 'parts/Frame';

import TextEditor from './TextEditor';
import Preview from './Preview';

function generateCombinedHtml(content) {
  return (
    `
      <style>${content.css}</style>
      <div>${content.html}</div>
    `
  );
}

export default class Editor extends React.Component {
  static propTypes = {
    editorPath: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();

    this.state = {
      loading: false,
      content: {
        html: '',
        css: '',
        javascript: '',
      },
    };
  }


  componentDidMount() {
    const { editorPath } = this.props;

    this.unmountRef = this.ref.syncState(editorPath, {
      context: this,
      state: 'content',
    });
  }

  componentWillReceiveProps(nextProps) {
    this.ref.removeBinding(this.unmountRef);

    this.unmountRef = this.ref.syncState(nextProps.editorPath, {
      context: this,
      state: 'content',
    });
  }

  componentWillUnmount() {
    this.ref.removeBinding(this.unmountRef);
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

  render() {
    const { loading, content } = this.state;
    const PreviewFrame = frame(Preview, this.state.content.javascript);
    return (
      <div className="editor columns">
        <div className="editor-text-editors column col-5">
          <TextEditor mode="html" content={content.html} onChange={this.setHtml} />
          <TextEditor mode="css" content={content.css} onChange={this.setCss} />
        </div>
        <div className="editor-preview column col-7">
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

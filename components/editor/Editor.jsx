import React, { PropTypes } from 'react';

import * as Firebase from 'functions/firebase';

import Icon from 'parts/Icon';

import TextEditor from './TextEditor';

export default class Editor extends React.Component {
  static propTypes = {
    editorPath: PropTypes.string,
    previewUrl: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.ref = Firebase.getFirebaseInstance();

    this.state = {
      content: {
        html: '',
        css: '',
        javascript: '',
      },
    };
  }


  componentDidMount() {
    const path = `${this.props.editorPath}`;

    this.unmountRef = this.ref.syncState(path, {
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
        html: content || '',
      },
    });
  }

  setCss = (content) => {
    this.setState({
      content: {
        css: content || '',
      },
    });
  }

  render() {
    const { content } = this.state;
    const { previewUrl } = this.props;
    return (
      <div className="editor columns">
        <div className="editor-text-editors column col-5">
          <TextEditor mode="html" content={content.html} onChange={this.setHtml} />
          <TextEditor mode="css" content={content.css} onChange={this.setCss} />
        </div>
        <div className="editor-preview column col-7">
          <iframe id="previewFrame" frameBorder="0" src={previewUrl} />
        </div>
      </div>
    );
  }
}

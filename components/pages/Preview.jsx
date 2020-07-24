import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Firebase from 'functions/firebase';

import Helmet from 'react-helmet';

export default class ExampleComponent extends Component {
  static propTypes = {
    params: PropTypes.shape({
      roomName: PropTypes.string.isRequired,
      userId: PropTypes.string,
    }),
  };

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
    const { roomName, userId } = this.props.params;
    const path = userId === 'instructor' ? `rooms/${roomName}/instructor/editorContent` : `rooms/${roomName}/users/${userId}/editorContent`;

    this.unmountRef = this.ref.syncState(path, {
      context: this,
      state: 'content',
    });
  }

  generateCombinedHtml = (content) =>
      `
        <style>
        html {
          all: initial;
        }
        html * {
          all: revert;
        }
        </style>
        <style>
          ${content.css}
        </style>
        <div>${content.html}</div>
      `

  render() {
    const { content } = this.state;
    return (
      <div>
        <Helmet title="Preview" />
        <div className="preview" dangerouslySetInnerHTML={{ __html: this.generateCombinedHtml(content) }} />
      </div>
    );
  }
}

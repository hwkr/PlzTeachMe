import React, { Component, PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

export default class ExampleComponent extends Component {
  static propTypes = {
    children: PropTypes.element,
    options: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      editorType: PropTypes.string,
      lineNumbers: PropTypes.bool,
    }),
  };


  state = {
    code: '// Code',
  }

  editorRefCallback = (ref) => {
    const cm = ref.getCodeMirror();
    const { width, height } = this.props.options;
    // set width & height
    cm.setSize(width, height);
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    });
  }

  render() {
    return (
      <div className="CodeMirrorComponent">
        <CodeMirror ref={this.editorRefCallback} value={this.state.code} onChange={this.updateCode} options={this.props.options} />
      </div>
    );
  }
}

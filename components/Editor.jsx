import React, { Component, PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

export default class ExampleComponent extends Component {
  static propTypes = {
    children: PropTypes.element,
    width: PropTypes.string,
    height: PropTypes.string,
  };

  state = {
    code: '// Code',
  }

  editorRefCallback = (ref) => {
    const cm = ref.getCodeMirror();
    const { width, height } = this.props;
    // set width & height
    cm.setSize(width, height);
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    });
  }

  render() {
    const options = {
      lineNumbers: true,
      width: '100px',
      height: '100px',
    };

    return (
      <div className="CodeMirrorComponent">
        <CodeMirror ref={this.editorRefCallback}value={this.state.code} onChange={this.updateCode} options={options} />
      </div>
    );
  }
}

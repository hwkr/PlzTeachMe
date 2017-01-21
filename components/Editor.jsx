import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

export default class Editor extends React.Component {
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    editorType: PropTypes.string,
    lineNumbers: PropTypes.bool,
    mode: 'html' | 'css' | 'javascript',
  };

  static defaultProps = {
    lineNumbers: true,
  }

  state = {
    code: `// ${this.props.mode}`,
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
    return (
      <div className="codeEditor">
        <CodeMirror ref={this.editorRefCallback} value={this.state.code} onChange={this.updateCode} options={this.props} />
      </div>
    );
  }
}

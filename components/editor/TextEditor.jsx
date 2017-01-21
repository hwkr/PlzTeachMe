import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

export default class TextEditor extends React.Component {
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    editorType: PropTypes.string,
    lineNumbers: PropTypes.bool,
    mode: PropTypes.string,
    onChange: PropTypes.func,
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
        <CodeMirror ref={this.editorRefCallback} value={this.props.content} onChange={this.props.onChange} options={this.props} />
      </div>
    );
  }
}

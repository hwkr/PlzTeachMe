import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

export default class TextEditor extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    editorType: PropTypes.string,
    lineNumbers: PropTypes.bool,
  };

  static defaultProps = {
    lineNumbers: true,
  }

  render() {
    return (
      <div className="text-editor">
        <h4 className="editor-title">{this.props.mode}</h4>
        <CodeMirror value={this.props.content} onChange={this.props.onChange} options={this.props} />
      </div>
    );
  }
}

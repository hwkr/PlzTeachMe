import React, { Component, PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

export default class ExampleComponent extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  state = {
    code: '// Code',
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode,
    });
  }

  render() {
    const options = {
      lineNumbers: true,
    };

    return (
      <div>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
      </div>
    );
  }
}

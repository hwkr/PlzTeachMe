import React, { Component, PropTypes } from 'react';
import Editor from '../Editor';

export default class ExampleComponent extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const options = {
      type: 'javascript',
      width: '100px',
      height: '100px',
    };
    return (
      <div>
        <Editor options={options} />
      </div>
    );
  }
}

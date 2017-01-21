import React from 'react';
import CodeView from './CodeView';
import LiveView from './LiveView';

export default class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <CodeView />
        <LiveView />
      </div>
    );
  }
}

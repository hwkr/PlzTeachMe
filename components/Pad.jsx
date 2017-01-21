import React from 'react';
import CodeView from 'components/CodeView';
import LiveView from 'components/LiveView';

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

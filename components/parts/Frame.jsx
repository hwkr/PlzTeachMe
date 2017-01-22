import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Frame = (ComposedComponent, myJS) => class extends Component {
  static propTypes = {
    frameProps: React.PropTypes.object,
  }

  static defaultProps = {
    frameProps: {
      frameBorder: 0,
    },
  }

  updateIFrameContents = () => {
    ReactDOM.render((
      <ComposedComponent {...this.props} />
    ), this.el);
  }

  render = () => <iframe id="myframe" {...this.props.frameProps} />;

  componentDidMount = () => {
    const frame = ReactDOM.findDOMNode(this); //eslint-disable-line
    const frameBody = frame.contentDocument.body;
    const el = document.createElement('div');
    frameBody.appendChild(el);
    this.el = el;

    const rez = document.getElementById('myframe');
    rez.contentWindow.eval(myJS); // Since scripts don't work, run eval on the window.

    this.updateIFrameContents();
  }
};

export default Frame;

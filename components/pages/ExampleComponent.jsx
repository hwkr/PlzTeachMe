import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Helmet from 'react-helmet';

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
    return (
      <div>
        {this.props.children ||
        <div className="container">
          <Helmet title="Example" />
          <div>
            <Link to="/example/two-deep?field1=foo&field2=bar#boom!">
              Example two deep with query and hash
          </Link>
        </div>
        </div>
      }
      </div>
    );
  }
}

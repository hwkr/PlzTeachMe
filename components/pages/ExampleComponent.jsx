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
      <div className="container">
        <Helmet title="Example" />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>name</th>
              <th>duration</th>
              <th>genre</th>
              <th>release date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Shawshank Redemption</td>
              <td>2h 22min</td>
              <td>Crime, Drama</td>
              <td>14 October 1994</td>
            </tr>
            <tr>
              <td>The Shawshank Redemption</td>
              <td>2h 22min</td>
              <td>Crime, Drama</td>
              <td>14 October 1994</td>
            </tr>
            <tr>
              <td>The Shawshank Redemption</td>
              <td>2h 22min</td>
              <td>Crime, Drama</td>
              <td>14 October 1994</td>
            </tr>
            <tr>
              <td>The Shawshank Redemption</td>
              <td>2h 22min</td>
              <td>Crime, Drama</td>
              <td>14 October 1994</td>
            </tr>
            <tr className="selected">
              <td>The Shawshank Redemption</td>
              <td>2h 22min</td>
              <td>Crime, Drama</td>
              <td>14 October 1994</td>
            </tr>
            <tr>
              <td>The Shawshank Redemption</td>
              <td>2h 22min</td>
              <td>Crime, Drama</td>
              <td>14 October 1994</td>
            </tr>
            <tr>
              <td>The Shawshank Redemption</td>
              <td>2h 22min</td>
              <td>Crime, Drama</td>
              <td>14 October 1994</td>
            </tr>
          </tbody>
        </table>
        <div>
          <Link to="/example/two-deep?field1=foo&field2=bar#boom!">
            Example two deep with query and hash
          </Link>
        </div>
      </div>
    );
  }
}

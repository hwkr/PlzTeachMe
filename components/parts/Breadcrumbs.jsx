import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Breadcrumbs extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // static defaultProps = {
  // }

  generateMapMenu = () => {
    let path = '';

    function nextPath(route) {
      path += (
        (path.slice(-1) === '/' ? '' : '/') +
        (route.path === '/' ? '' : route.path)
      );
      return path;
    }

    return (
      this.props.routes.filter(route => route.mapMenuTitle)
        .map((route, index) => (
          <li className="breadcrumb-item" key={index}>
            <Link to={nextPath(route)}>{route.mapMenuTitle}</Link>
          </li>
        ))
    );
  }

  render() {
    return (
      <nav>
        <ul className="breadcrumb">
          {this.generateMapMenu()}
        </ul>
      </nav>
    );
  }
}

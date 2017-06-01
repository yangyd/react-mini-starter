
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { node, bool } = PropTypes;

export default class Header extends Component {
  static propTypes = { children: node.isRequired };
  static childContextTypes = { inHeader: bool };

  // Make children component aware that they are in the header
  getChildContext() {
    return { inHeader: true };
  }

  render() {
    return <thead>{ this.props.children }</thead>;
  }
}

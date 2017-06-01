
/* eslint css-modules/no-unused-class: [2, { markAsUsed: ['flex', 'align-right', 'last-child'] }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './style.css';

const { node, bool, string, number, oneOfType } = PropTypes;
const content = oneOfType([string, number]);

export default class Cell extends Component {
  static propTypes = {
    text: content,
    children: node,
    styleClass: string,
  };
  static defaultProps = {
    text: '',
    children: null,
    styleClass: '',
  };
  static contextTypes = { inHeader: bool };

  render() {
    const { text, styleClass, children } = this.props;

    // Allow user to put other components in the Cell
    return this.context.inHeader ?
      <th className={styles[styleClass]}>{text}</th> :
      <td className={styles[styleClass]}>{text || children}</td>;
  }
}

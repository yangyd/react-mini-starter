
import React, { Component, PropTypes } from 'react';
import style from './style.css';

const { string, shape, arrayOf, object, node } = PropTypes;

export default class Grid extends Component {
  static propTypes = {
    fields: arrayOf(shape({
      name: string,
      mapping: string,
      styleClass: string
    })).isRequired,

    data: arrayOf(object),

    children: node
  };

  render() {
    const { fields, data, children } = this.props;
    return (
      <table>
        <Header>
          <Row>
            {
              fields.map((field, index) => {
                return <Cell text={field.name} key={`th${index}`} styleClass={field.styleClass} />;
              })
            }
          </Row>
        </Header>
        {buildBody(fields, data)}
        {children}
      </table>
    ); // {children}: allow component user to add more elements (like <Footer />)
  }
}

export class Header extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static childContextTypes = {
    header: PropTypes.bool
  };

  getChildContext() {
    return { header: true };
  }

  render() {
    return <thead>{this.props.children}</thead>;
  }
}

export class Cell extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    header: PropTypes.bool,
  };

  render() {
    const { text, styleClass, children } = this.props;

    // Allow user to put other components in the Cell
    return this.context.header ?
      <th className={style[styleClass]}>{text}</th> :
      <td className={style[styleClass]}>{text || children}</td>;
  }
}

// Row, Body, Footer are just aliases for native elements
export function Row({children}) {
  return <tr>{children}</tr>;
}
export function Body({children}) {
  return <tbody>{children}</tbody>;
}
export function Footer({children}) {
  return <tfoot>{children}</tfoot>;
}

function buildRow(fields, row, rowIndex) {
  return (
    <Row key={`row${rowIndex}`}>
      {
        fields.map((field, cellIndex) =>
                   <Cell text={row[field.mapping]} styleClass={field.styleClass} key={`cell${cellIndex}`} />)
      }
    </Row>
  );
}

function buildBody(fields, data) {
  return <Body>{data.map((row, index) => buildRow(fields, row, index))}</Body>;
}

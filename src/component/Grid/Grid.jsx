
/* eslint react/jsx-closing-bracket-location: ["warn", { selfClosing: "after-props" }] */

import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Cell from './Cell';

const { string, number, shape, arrayOf, node } = PropTypes;

export function Row({ children }) {
  return <tr>{ children }</tr>;
}
export function Body({ children }) {
  return <tbody>{ children }</tbody>;
}
export function Footer({ children }) {
  return <tfoot>{ children }</tfoot>;
}
Row.propTypes = { children: node.isRequired };
Body.propTypes = { children: node.isRequired };
Footer.propTypes = { children: node.isRequired };

function buildRow(fields, row) {
  return (
    <Row key={`row-${row.id}`}>
      {
        fields.map(field =>
          <Cell key={field.mapping} text={row[field.mapping]} styleClass={field.styleClass} />)
      }
    </Row>
  );
}

function tableBody(fields, transactions) {
  return <Body>{ transactions.map(item => buildRow(fields, item)) }</Body>;
}

export default function Grid(props) {
  const { fields, transactions, children } = props;
  return (
    <table>
      <Header>
        <Row>
          {
            fields.map(field =>
              <Cell text={field.name} key={field.mapping} styleClass={field.styleClass} />)
          }
        </Row>
      </Header>
      { tableBody(fields, transactions) }
      { children }
    </table>
  );
}

Grid.propTypes = {
  fields: arrayOf(shape({
    name: string,
    mapping: string,
    styleClass: string,
  })).isRequired,

  transactions: arrayOf(shape({
    id: number,
    displayName: string, // display name of the sum
    value: number, // the sum of all items
  })).isRequired,

  children: node,
};


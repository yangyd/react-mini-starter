
import React from 'react';
import PropTypes from 'prop-types';
import { isString } from 'lodash';

import Grid from './Grid';

const { string, shape, number, arrayOf } = PropTypes;

function decimal2(n) {
  return isString(n) ? n : parseFloat(Math.round(n * 100) / 100).toFixed(2);
}

export default function TransactionSummary(props) {
  const { fields, data } = props;
  return (
    <Grid.Footer>
      <Grid.Row>
        {
          fields.map(field =>
            <Grid.Cell key={`summary-${field.mapping}`}
              text={decimal2(data[field.mapping])} styleClass={field.styleClass} />)
        }
      </Grid.Row>
    </Grid.Footer>
  );
}

TransactionSummary.propTypes = {
  // Meta info of each field (cell)
  fields: arrayOf(shape({
    mapping: string,
    styleClass: string,
  })).isRequired,

  data: shape({
    displayName: string, // display name of the sum
    value: number, // the sum of all items
  }).isRequired,
};


import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from './Grid';

export default class TransactionForm extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired, // (displayName, value) => {}
  };

  field = {}

  onFieldKeyUp = (e) => {
    if (e.keyCode === 13) { this.submitForm(); }
  }

  submitForm() {
    const { valueField, descField } = this.field;
    const { action } = this.props;
    const value = parseFloat(valueField.value, 10);
    const displayName = descField.value;

    if (value === 0 || isNaN(value) || displayName.length === 0) {
      return;
    }

    action(displayName, value);
    valueField.value = '';
    descField.value = '';
    descField.focus();
  }

  render() {
    return (
      <Grid.Footer>
        <Grid.Row>
          <Grid.Cell>
            <input name="description" placeholder="Description"
              ref={(_) => { this.field.descField = _; }} onKeyUp={this.onFieldKeyUp} />
          </Grid.Cell>
          <Grid.Cell>
            <input name="value" placeholder="Value"
              ref={(_) => { this.field.valueField = _; }} onKeyUp={this.onFieldKeyUp}
              type="number" step="any" />
          </Grid.Cell>
        </Grid.Row>
      </Grid.Footer>
    );
  }

}


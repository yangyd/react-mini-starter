
import React, { Component, PropTypes } from 'react';

import Header from './Header';
import Grid from './Grid';

import './GridApp.css';

export default class GridApp extends Component {

  // Props is injected to constructor
  // or can be accessed using this.props
  constructor({transactions, gridFields}) {
    super();
    this.state = { 
      fields: gridFields,
      data: transactions,
    };
  }

  decimal2(n) {
    return parseFloat(Math.round(n * 100) / 100).toFixed(2);
  }

  addEntry(entry) {
    this.state.data.push(entry);
    this.setState(this.state);
  }

  render() {
    const {data} = this.state;
    const summary = {
      description: 'Balance',
      value: this.decimal2(data.map(({value}) => value).reduce((a, b) => (a + b), 0)),
    };

    const addEntry = this.addEntry.bind(this);

    return (
      <div className="viewport">
        <Header />
        <Grid {...this.state}>
          <TransactionSummary fields={this.state.fields} data={summary} />
          <TransactionForm action={addEntry} />
        </Grid>
      </div>
    );
  }
}

const { string, shape, arrayOf, object } = PropTypes;
class TransactionSummary extends Component {
  static propTypes = {
    fields: arrayOf(shape({
      mapping: string,
      className: string
    })).isRequired,
    data: object
  };

  render() {
    const { fields, data } = this.props;
    return (
      <Grid.Footer>
        <Grid.Row>
          {
            fields.map((field, index) => {
              return <Grid.Cell text={data[field.mapping]} className={field.className} key={`tf${index}`} />;
            })
          }
        </Grid.Row>
      </Grid.Footer>
    );
  }
}


class TransactionForm extends Component {
  static propTypes = {
    action: PropTypes.func
  };

  onFieldKeyUp(e) {
    e.keyCode === 13 && this.submitForm();
  }

  submitForm() {
    const { valueField, descField } = this.refs;
    const { action } = this.props;
    const value = parseFloat(valueField.value, 10);
    const description = descField.value;

    if (value === 0  || isNaN(value) || description.length === 0) {
      return;
    }

    action({ value, description });
    valueField.value = descField.value = ''; // clear inputed data

    descField.focus();
  }

  render() {
    const onFieldKeyUp = this.onFieldKeyUp.bind(this);
    return (
      <Grid.Footer>
        <Grid.Row>
          <Grid.Cell>
            <input name="description" placeholder="Description"
                ref="descField" onKeyUp={onFieldKeyUp} />
          </Grid.Cell>
          <Grid.Cell>
            <input name="value" placeholder="Value"
                ref="valueField" onKeyUp={onFieldKeyUp} type="number" step="any" />
          </Grid.Cell>
        </Grid.Row>
      </Grid.Footer>
    );
  }

}


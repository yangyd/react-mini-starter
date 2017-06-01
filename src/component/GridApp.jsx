
import React, { Component } from 'react';

import Header from './Header';
import Grid from './Grid';
import TransactionSummary from './TransactionSummary';
import TransactionForm from './TransactionForm';

import styles from './GridApp.css';

export default class GridApp extends Component {
  constructor({ transactions, gridFields }) {
    super();
    this.state = {
      fields: gridFields,
      transactions,
    };
  }

  // @autobind method
  addEntry = (displayName, value) => {
    const id = this.state.transactions.length + 1;
    this.state.transactions.push({ displayName, value, id });
    this.setState(this.state);
  }

  getSum() {
    return this.state.transactions.map(_ => _.value).reduce((a, b) => (a + b), 0);
  }

  render() {
    const summaryData = {
      displayName: 'Balance',
      value: this.getSum(),
    };
    return (
      <div className={styles.viewport}>
        <Header />
        <Grid {...this.state}>
          <TransactionSummary fields={this.state.fields} data={summaryData} />
          <TransactionForm action={this.addEntry} />
        </Grid>
      </div>
    );
  }
}

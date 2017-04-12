import React, {Component} from 'react';
import ProductTable from './ProductTable';
import SearchBar from './SearchBar';

// Define component as ES6 class

// https://facebook.github.io/react/docs/reusable-components.html
class FilterableProductTable extends Component {

  constructor({products}) {
    super();

    this.products = products;
    this.handleUserInput = this.handleUserInput.bind(this);

    // Here is where mutable state is maintained
    // Instead of providing a separate getInitialState method, you set up your 
    // own state property in the constructor.
    this.state = { 
      filterText: '',
      inStockOnly: false,
    };
  }

  handleUserInput(filterText, inStockOnly) {
    this.setState({ // update the state
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      // The state gets propogated back to children components
      // as their props (means recreate them to reflect new states)
      <div>
        <SearchBar {...this.state} onUserInput={this.handleUserInput} />
        <ProductTable products={this.products} {...this.state} />
      </div>
    )
  }
}

export default FilterableProductTable;


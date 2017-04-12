import React, {Component} from 'react';

class SearchBar extends Component {

  constructor() {
    super();
    // Unlike React.createClass, If a method is to be used on React Elements, 
    // it has to be explicitly binded
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    // Delegate action to the onUserInput property (provided by parents)

    // use this.refs to access elements
    // https://facebook.github.io/react/docs/more-about-refs.html
    this.props.onUserInput(
      this.refs['filterTextInput'].value,
      this.refs['inStockOnlyInput'].checked
    );
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search..."
          ref="filterTextInput"
          value={this.props.filterText}
          onChange={this.handleChange} />

        <input type="checkbox" 
          ref="inStockOnlyInput"
          checked={this.props.inStockOnly}
          onChange={this.handleChange} />

        {' '} Only show products in stock
      </form>
    );
  }
}

export default SearchBar;

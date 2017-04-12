
import React from 'react';

// A factory method that simply returns an React Element (React.createElement)
// It's functionally similar as React.createClass with only the render method, 
// and the `props` object will be injected as argument.
// using ES6 Destructuring assignment --> ({category})

// Caution: These components must not retain internal state, do not have backing instances, 
// and do not have the component lifecycle methods. 
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions

function CategoryRow ({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow ({product}) {
  const name = product.stocked ? product.name : 
    <span style={{color: 'red'}}> {product.name} </span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// `this.props` (parameter to the factory method) is provided by the parent:
// {
//   products: [],
//   filterText: 'asdf',
//   inStockOnly: false,
// }
function ProductTable ({products, filterText, inStockOnly}) {
  const rows = [];
  let lastCategory = null;

  // build table from the `products` model
  products.forEach(product => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase()) ||
        (!product.stocked && inStockOnly)) {
      return;
    }

    if (product.category !== lastCategory) {
        rows.push(
          <CategoryRow category={product.category} key={product.category} />
        );
    }

    rows.push(<ProductRow product={product} key={product.name}/>);
    lastCategory = product.category;
  });

  if (rows.length > 0) {
    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  } else {
    return <p>\_(ツ)_/¯</p>;
  }
}

export 
const HelloWorld = React.createClass({
  render () {
    return (
      <h1>React Really Works!</h1>
    );
  },
});

export default ProductTable;

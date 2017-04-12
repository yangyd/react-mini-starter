export default [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

export const transactions = [
  {
    id: 1,
    description: 'Trader Joe\'s food',
    value: -123.34
  },
  {
    id: 2,
    description: 'Gas',
    value: -64.73
  },
  {
    id: 3,
    description: 'Ebay sale - guitar',
    value: 102.00
  }
];
export const fields = [
  {
    name: 'Description',
    className: 'flex',
    mapping: 'description'
  },
  {
    name: 'Value',
    className: 'align-right',
    mapping: 'value'
  }
];

export const defaultSummary = {
  description: 'Balance'
};








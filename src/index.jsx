
import React from 'react';
import ReactDOM from 'react-dom';

import GridApp from 'component/GridApp';
import {fields, transactions} from 'grid-data';

require('./index.html.template');

ReactDOM.render(
  <GridApp gridFields={fields} transactions={transactions} />,
  document.getElementById('root'));



import React from 'react';
import ReactDOM from 'react-dom';

import 'index.html';
import GridApp from 'component/GridApp';
import {fields, transactions} from 'grid-data';

ReactDOM.render(
  <GridApp gridFields={fields} transactions={transactions} />,
  document.getElementById('root'));

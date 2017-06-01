
import _ from 'lodash';
import Grid, { Footer, Body, Row } from './Grid';
import Header from './Header';
import Cell from './Cell';

// So that component user can access child-components as Grid.Header, Grid.Footer, ...
export default _.assign(Grid, {
  Header, Footer, Body, Row, Cell,
});

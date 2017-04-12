
import Grid, {Header, Footer, Body, Row, Cell} from './Grid';

// So that component user can access child-components as Grid.Header, Grid.Footer, ...
export default Object.assign(Grid, {
  Header, Footer, Body, Row, Cell
});

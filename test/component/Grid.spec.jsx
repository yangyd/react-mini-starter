
/* global describe it expect */
/* eslint no-bitwise: ["error", { "allow": ["~"] }] */

import React from 'react';
import { shallow } from 'enzyme';

import Grid from '../../src/component/Grid';

// helpers
function contains(str, pattern) {
  return !!~str.indexOf(pattern);
}

function len(arrayLike) {
  return arrayLike.map(() => 1).reduce((a, b) => a + b);
}


describe('The <Grid /> component', () => {
  describe('<Grid.Body />', () => {
    it('renders a <tbody> with child content', () => {
      const wrapper = shallow(<Grid.Body>body content</Grid.Body>);
      expect(wrapper.find('tbody').first().text()).toEqual('body content');
    });
  });

  describe('<Grid.Row />', () => {
    it('renders a <tr> with child content', () => {
      const wrapper = shallow(<Grid.Row>row content</Grid.Row>);
      expect(wrapper.find('tr').first().text()).toEqual('row content');
    });
  });

  describe('<Grid.Footer />', () => {
    it('renders a <tfoot> with child content', () => {
      const wrapper = shallow(<Grid.Footer>footer content</Grid.Footer>);
      expect(wrapper.find('tfoot').first().text()).toEqual('footer content');
    });
  });

  describe('<Grid.Cell />', () => {
    it('accepts style class for rendered elements', () => {
      const wrapper = shallow(<Grid.Cell text="cell content" styleClass="flex" key="row-12" />);
      const elem = wrapper.find('td');
      expect(len(elem)).toBe(1);
      expect(contains(elem.html(), 'style-flex-')); // workaround for css-modules
      expect(elem.text()).toEqual('cell content');
    });
  });

});

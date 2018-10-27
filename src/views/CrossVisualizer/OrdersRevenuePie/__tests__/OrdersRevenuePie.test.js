import React from 'react';
import { shallow } from 'enzyme';

import OrdersRevenuePie from '../OrdersRevenuePie';
import { crossFilterMock, dimensionsMock } from '../../../../utils/test-utils';

describe('<OrdersRevenuePie /> Component', () => {

  test('should render children and match snapshot', () => {
    const orders = crossFilterMock;
    const dimensions = dimensionsMock;
    const onFilter = jest.fn();

    const rendered = shallow(<OrdersRevenuePie
      orders={orders}
      dimensions={dimensions}
      onFilter={onFilter}
    />);

    expect(rendered).toMatchSnapshot();
  });

});

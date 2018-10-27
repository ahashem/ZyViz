import React from 'react';
import { shallow } from 'enzyme';

import OrdersRevenueBar from '../OrdersRevenueBar';
import { crossFilterMock, dimensionsMock } from '../../../../utils/test-utils';

describe('<OrdersRevenueBar /> Component', () => {

  test('should render children and match snapshot', () => {
    const orders = crossFilterMock;
    const dimensions = dimensionsMock;
    const onFilter = jest.fn();

    const rendered = shallow(<OrdersRevenueBar
      orders={orders}
      dimensions={dimensions}
      onFilter={onFilter}
    />);

    expect(rendered).toMatchSnapshot();
  });

});

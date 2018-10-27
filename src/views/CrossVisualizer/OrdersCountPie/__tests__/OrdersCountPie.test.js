import React from 'react';
import { shallow } from 'enzyme';

import OrdersCountPie from '../OrdersCountPie';
import { crossFilterMock, dimensionsMock } from '../../../../utils/test-utils';

describe('<OrdersCountPie /> Component', () => {

  test('should render children and match snapshot', () => {
    const orders = crossFilterMock;
    const dimensions = dimensionsMock;
    const onFilter = jest.fn();

    const rendered = shallow(<OrdersCountPie
      orders={orders}
      dimensions={dimensions}
      onFilter={onFilter}
    />);

    expect(rendered).toMatchSnapshot();
  });

});

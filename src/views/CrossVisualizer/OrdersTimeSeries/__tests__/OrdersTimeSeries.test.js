import React from 'react';
import { shallow } from 'enzyme';

import OrdersTimeSeries from '../OrdersTimeSeries';
import { crossFilterMock, dimensionsMock } from '../../../../utils/test-utils';

describe('<OrdersTimeSeries /> Component', () => {

  test('should render children and match snapshot', () => {
    const orders = crossFilterMock;
    const dimensions = dimensionsMock;
    const onFilter = jest.fn();

    const rendered = shallow(<OrdersTimeSeries
      orders={orders}
      dimensions={dimensions}
      onFilter={onFilter}
    />);

    expect(rendered).toMatchSnapshot();
  });

});

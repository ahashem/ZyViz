import React from 'react';
import { shallow } from 'enzyme';

import OrdersCountPie from '../OrdersCountPie';
import crossfilter from '../../../../components/crossfilter/crossfilter';

import mockOrders from '../../../../utils/test-utils/mock-test-orders';

describe('<OrdersCountPie /> Component', () => {

  const mockOrdersCrossed = crossfilter(mockOrders);

  test('should render children and match snapshot', () => {

    const rendered = shallow(<OrdersCountPie orders={mockOrdersCrossed}/>);

    expect(rendered).toMatchSnapshot();
  });

});

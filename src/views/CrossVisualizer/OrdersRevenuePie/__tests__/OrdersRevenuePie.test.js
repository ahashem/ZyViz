import React from 'react';
import { shallow } from 'enzyme';

import OrdersRevenuePie from '../OrdersRevenuePie';
import crossfilter from '../../../../components/crossfilter/crossfilter';

import mockOrders from '../../../../utils/test-utils/mock-test-orders';

describe('<OrdersRevenuePie /> Component', () => {

  const mockOrdersCrossed = crossfilter(mockOrders);

  test('should render children and match snapshot', () => {

    const rendered = shallow(<OrdersRevenuePie orders={mockOrdersCrossed}/>);

    expect(rendered).toMatchSnapshot();
  });

});

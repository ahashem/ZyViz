import React from 'react';
import { shallow } from 'enzyme';

import OrdersCountPie from '../OrdersCountPie';
import crossfilter from '../../../../components/crossfilter/crossfilter';
import mockOrders from '../../../../utils/test-utils/mock-test-orders';
import { GenerateDimensions, NormalizeData } from '../../visualizer-data-structure';

const mockOrdersCrossed = crossfilter(NormalizeData(mockOrders));
const mockOrdersDimensions = GenerateDimensions(mockOrdersCrossed);

describe('<OrdersCountPie /> Component', () => {

  test('should render children and match snapshot', () => {
    const dimensions = mockOrdersDimensions;
    const onFilter = jest.fn();

    const rendered = shallow(<OrdersCountPie
      orders={mockOrdersCrossed}
      dimensions={dimensions}
      onFilter={onFilter}
    />);

    expect(rendered).toMatchSnapshot();
  });

});

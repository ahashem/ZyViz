import React from 'react';
import { mount, shallow } from 'enzyme';

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

describe('<OrdersRevenueBar /> Inner Components', () => {
  let rendered, onFilter;

  beforeEach(() => {
    const orders = crossFilterMock;
    const dimensions = dimensionsMock;
    onFilter = jest.fn();

    rendered = mount(<OrdersRevenueBar
      orders={orders}
      dimensions={dimensions}
      onFilter={onFilter}
    />);
  });

  it('should filter data by clicking on the chart', () => {
    expect(rendered.find('VictoryBar')).toHaveLength(3);
    expect(rendered.find('BarChart')).toHaveLength(3);
  });

  it('should filter data by clicking on the chart', () => {
    rendered.instance().crossFilterSelected();
    expect(onFilter).toBeCalled();
  });

  it.skip('should filter data by clicking on the chart', () => {
    const mockFunc = jest.fn();
    rendered.instance().crossFilterSelected = () => jest.fn();
    rendered.find('BarChart').forEach((node) => {
      node.simulate('click');
      expect(mockFunc).toBeCalled();
    });

  });
});


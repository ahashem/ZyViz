import React from 'react';
import { mount, shallow } from 'enzyme';

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

describe('<OrdersRevenuePie /> Inner Components', () => {
  let rendered, onFilter;

  beforeEach(() => {
    const orders = crossFilterMock;
    const dimensions = dimensionsMock;
    onFilter = jest.fn();

    rendered = mount(<OrdersRevenuePie
      orders={orders}
      dimensions={dimensions}
      onFilter={onFilter}
    />);
  });

  it('should filter data by clicking on the chart', () => {
    expect(rendered.find('VictoryPie')).toHaveLength(3);
    expect(rendered.find('PieChart')).toHaveLength(3);
  });

  it('should filter data by clicking on the chart', () => {
    rendered.instance().crossFilterSelected();
    expect(onFilter).toBeCalled();
  });

  it.skip('should filter data by clicking on the chart', () => {
    const mockFunc = jest.fn();
    rendered.instance().crossFilterSelected = () => jest.fn();
    rendered.find('PieChart').forEach((node) => {
      node.simulate('click');
      expect(mockFunc).toBeCalled();
    });

  });
});

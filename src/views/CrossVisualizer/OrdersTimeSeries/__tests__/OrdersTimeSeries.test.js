import React from 'react';
import { shallow } from 'enzyme';

import OrdersTimeSeries from '../OrdersTimeSeries';
import { crossFilterMock, dimensionsMock } from '../../../../utils/test-utils';
import MockDate from 'mockdate';

describe('<OrdersTimeSeries /> Component', () => {
  beforeAll(() => {
    MockDate.set('1/1/2018');
  });

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

  afterAll(() => {
    MockDate.reset();
  });

});

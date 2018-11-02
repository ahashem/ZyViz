import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';

import OrdersTimeSeries from '../OrdersTimeSeries';
import { crossFilterMock, dimensionsMock } from '../../../../utils/test-utils';

describe.skip('<OrdersTimeSeries /> Component', () => {
  beforeAll(() => {
    MockDate.set('11/3/2018');
    Date.constructor = jest.fn(() => 1541196000000);
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

import React from 'react';
import { shallow } from 'enzyme';

import OrdersCountBar from '../OrdersCountBar';
import { crossFilterMock, dimensionsMock } from '../../../../utils/test-utils';

describe('<OrdersCountBar /> Component', () => {

  test('should render children and match snapshot', () => {
    const orders = crossFilterMock;
    const dimensions = dimensionsMock;
    const onFilter = jest.fn();

    const rendered = shallow(<OrdersCountBar
      orders={orders}
      dimensions={dimensions}
      onFilter={onFilter}
    />);

    expect(rendered).toMatchSnapshot();
  });

});

import React from 'react';
import { shallow } from 'enzyme/build';
import OrdersByPayment from '../OrdersByPayment';

describe('<OrdersByPayment /> component', () => {
  it('should render with simple data', () => {
    const mockData = [
      { x: 'Cats', y: 35 },
      { x: 'Dogs', y: 40 },
      { x: 'Birds', y: 55 }
    ];

    const rendered = shallow(
      <OrdersByPayment
        data={mockData}
      />
    );

    expect(rendered).toMatchSnapshot();
  });
});


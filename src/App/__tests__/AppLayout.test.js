import React from 'react';
import { shallow } from 'enzyme/build';
import AppLayout from '../Layout/AppLayout';

describe('<AppLayout /> component', () => {
  it('should render children', () => {
    const mockChildren = [];

    const rendered = shallow(
      <AppLayout>
        {mockChildren}
      </AppLayout>
    );

    expect(rendered).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme/build';
import AppSidebar from '../Layout/AppSidebar';

describe('<AppSidebar /> component', () => {
  it('should render without children', () => {
    const rendered = shallow(
      <AppSidebar />
    );

    expect(rendered).toMatchSnapshot();
  });

  it('should render with children', () => {
    const mockChildren = [];
    const onCollapse = jest.fn();

    const rendered = shallow(
      <AppSidebar collapsed={false} onCollapse={onCollapse}>
        {mockChildren}
      </AppSidebar>
    );

    expect(rendered).toMatchSnapshot();
  });
});

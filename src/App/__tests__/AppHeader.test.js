import React from 'react';
import { shallow } from 'enzyme/build';
import AppHeader from '../Layout/AppHeader';

describe('<AppHeader /> component', () => {
  it('should render without children', () => {

    const rendered = shallow(
      <AppHeader />
    );

    expect(rendered).toMatchSnapshot();
  });

  it('should render with children', () => {
      const mockChildren = [];

      const rendered = shallow(
        <AppHeader>
          {mockChildren}
        </AppHeader>
      );

      expect(rendered).toMatchSnapshot();
    });
});

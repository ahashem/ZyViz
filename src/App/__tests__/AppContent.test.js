import React from 'react';
import { shallow } from 'enzyme';
import AppContent from '../Layout/AppContent';

describe('<AppContent /> component', () => {
  it('should render children', () => {
    const mockChildren = [];

    const rendered = shallow(
      <AppContent>
        {mockChildren}
      </AppContent>
    );

    expect(rendered).toMatchSnapshot();
  });
});

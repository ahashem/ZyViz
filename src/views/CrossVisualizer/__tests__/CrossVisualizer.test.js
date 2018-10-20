import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CrossVisualizer from '../CrossVisualizer';


describe('<CrossVisualizer /> Component', () => {
  it('should render children', () => {
    const mockChartData = {
      id: '001',

    };
    const CrossVisualizerStore = {
      loading: false,
      error: false,
      errorMes: '',
    };
    const mockStore = configureStore();
    const store = mockStore({ CrossVisualizerStore });

    const rendered = shallow(<CrossVisualizer store={store} chartsData={mockChartData} />);

    expect(rendered).toMatchSnapshot();
  });
});

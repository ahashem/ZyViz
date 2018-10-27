import React from 'react';
import { shallow } from 'enzyme';
import BarChart from '../BarChart';

describe('<BarChart /> component', () => {
  it('should render with simple data', () => {
    const mockChartData = [
      { x: 'Cats', y: 35 },
      { x: 'Dogs', y: 40 },
      { x: 'Birds', y: 55 }
    ];

    const rendered = shallow(
      <BarChart data={mockChartData}/>
    );

    expect(rendered).toMatchSnapshot();
  });
});


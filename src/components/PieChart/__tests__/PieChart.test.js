import React from 'react';
import { shallow } from 'enzyme';
import PieChart from '../PieChart';

describe('<PieChart /> component', () => {
  it('should render with simple data', () => {
    const mockChartData = [
      { x: 'Cats', y: 35 },
      { x: 'Dogs', y: 40 },
      { x: 'Birds', y: 55 }
    ];

    const rendered = shallow(
      <PieChart
        name="testChart"
        data={mockChartData}
      />
    );

    expect(rendered).toMatchSnapshot();
  });
});


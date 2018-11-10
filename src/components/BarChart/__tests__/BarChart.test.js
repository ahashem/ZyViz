import React from 'react';
import { shallow } from 'enzyme';
import BarChart from '../BarChart';
import { currencyTickFormat } from '../../../utils/helpers';

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

  it('should render horizontal chart with simple data', () => {
    const mockChartData = [
      { x: 'Cats', y: 35 },
      { x: 'Dogs', y: 40 },
      { x: 'Birds', y: 55 }
    ];

    const rendered = shallow(
      <BarChart
        horizontal
        labeledBars
        axisFormats={{ y: currencyTickFormat }}
        hiddenTicks={{ y: true }}
        data={mockChartData}
        labelKey="x"
      />
    );

    expect(rendered).toMatchSnapshot();
  });
});


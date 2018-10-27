import React from 'react';
import { shallow } from 'enzyme';
import range from 'lodash/range';

import TimeSeries from '../TimeSeries';

describe('<TimeSeries /> component', () => {
  it('should render with simple data', () => {
    // 10000 points (10 / 0.001 = 10000)
    const mockTimeSeriesData = range(0, 10, 0.001).map(x => ({
      x: x,
      y: Math.sin(Math.PI * x / 2) * x / 10
    }));

    const rendered = shallow(
      <TimeSeries
        data={mockTimeSeriesData}
        maxPoints={400}
      />
    );

    expect(rendered).toMatchSnapshot();
  });
});


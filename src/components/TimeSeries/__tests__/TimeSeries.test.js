import React from 'react';
import { shallow } from 'enzyme';
import range from 'lodash/range';

import TimeSeries from '../TimeSeries';

describe.skip('<TimeSeries /> component', () => {
  it('should render with simple data', () => {
    // 1000 points (10 / 0.01 = 1000)
    const mockTimeSeriesData = range(0, 10, 0.01).map(x => ({
      x: x,
      y: Math.sin(Math.PI * x / 2) * x / 10
    }));

    const rendered = shallow(
      <TimeSeries
        data={mockTimeSeriesData}
        maxPoints={50}
      />
    );

    expect(rendered).toMatchSnapshot();
  });
});


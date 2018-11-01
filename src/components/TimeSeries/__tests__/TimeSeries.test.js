import React from 'react';
import { shallow } from 'enzyme';

import TimeSeries from '../TimeSeries';

describe('<TimeSeries /> component', () => {
  it('should render with simple data', () => {
    const mockTimeSeriesData = [
      { x: new Date(Date.UTC(2019, 1, 1)), y: 125 },
      { x: new Date(Date.UTC(2018, 1, 1)), y: 257 },
      { x: new Date(Date.UTC(2015, 1, 1)), y: 345 },
      { x: new Date(Date.UTC(2015, 1, 1)), y: 515 },
      { x: new Date(Date.UTC(2011, 1, 1)), y: 132 },
      { x: new Date(Date.UTC(2010, 1, 1)), y: 305 },
      { x: new Date(Date.UTC(2011, 1, 1)), y: 270 },
      { x: new Date(Date.UTC(2015, 1, 1)), y: 470 }
    ];

    const rendered = shallow(
      <TimeSeries
        data={mockTimeSeriesData}
      />
    );

    expect(rendered).toMatchSnapshot();
  });
});


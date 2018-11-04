import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';

import TimeSeries from '../TimeSeries';

describe('<TimeSeries /> component', () => {
  beforeAll(() => {
    MockDate.set('11/3/2018');
    Date.constructor = jest.fn(() => 1541196000000);
  });

  test('should render with simple data', () => {
    const mockTimeSeriesData = [
      { x: new Date(Date.parse('2018-03-11T00:00:00+00:00')), y: 125 },
      { x: new Date(Date.parse('2018-03-11T00:00:00+00:00')), y: 257 },
      { x: new Date(Date.parse('2018-11-11T00:00:00+00:00')), y: 345 },
      { x: new Date(Date.parse('2018-07-11T00:00:00+00:00')), y: 515 },
      { x: new Date(Date.parse('2018-04-11T00:00:00+00:00')), y: 132 },
      { x: new Date(Date.parse('2014-03-11T00:00:00+00:00')), y: 305 },
      { x: new Date(Date.parse('2015-03-11T00:00:00+00:00')), y: 270 },
      { x: new Date(Date.parse('2016-03-11T00:00:00+00:00')), y: 470 }
    ];

    const mockZoomDomain = {
      x: [
        new Date(Date.parse('2015-01-01T00:00:00+00:00')),
        new Date(Date.parse('2017-01-01T00:00:00+00:00'))
      ]
    };

    const rendered = shallow(
      <TimeSeries
        name={'mock-chart'}
        data={mockTimeSeriesData}
        zoomDomain={mockZoomDomain}
      />
    );

    expect(rendered).toMatchSnapshot();
  });

  afterAll(() => {
    MockDate.reset();
  });
});


import React from 'react';
import { shallow } from 'enzyme';

import OrdersCountPie from '../OrdersCountPie';
import crossfilter from '../../../../components/crossfilter/crossfilter';

describe('<OrdersCountPie /> Component', () => {
  const mockOrders = [
    {
      'userid': '94a16117-9db3-4f25-abdf-1c3ef6578097',
      'orderid': 36,
      'orderAmount': '$51.89',
      'orderdate': '2015-03-16T19:46:12+00:00',
      'paymentMethod': 'Cash',
      'branch': 'Branch D',
      'deliveryArea': 'Mirqab'
    },
    {
      'userid': '0aed2c89-8d05-4a0c-b5dd-35c24829020e',
      'orderid': 37,
      'orderAmount': '$22.77',
      'orderdate': '2015-11-06T12:33:56+00:00',
      'paymentMethod': 'KNET',
      'branch': 'Branch A',
      'deliveryArea': 'Funaitees'
    },
  ];

  const mockOrdersCrossed = crossfilter(mockOrders);

  test('should render children and match snapshot', () => {

    const rendered = shallow(<OrdersCountPie orders={mockOrdersCrossed}/>);

    expect(rendered).toMatchSnapshot();
  });

});

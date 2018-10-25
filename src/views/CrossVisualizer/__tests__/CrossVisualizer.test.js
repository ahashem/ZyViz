import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CrossVisualizer from '../CrossVisualizer';

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


test('should render children and match snapshot', () => {
  const crossVisualizer = {
    loading: false,
    error: false,
    errorMes: '',
    ordersData: mockOrders,
  };
  const mockStore = configureStore();
  const store = mockStore({ crossVisualizer });

  const rendered = shallow(<CrossVisualizer store={store}/>);

  expect(rendered).toMatchSnapshot();
});

describe('<CrossVisualizer /> Component', () => {
  describe('UI during loading', () => {
    let wrapper;

    beforeAll(() => {
      const crossVisualizer = {
        loading: true,
      };
      const mockStore = configureStore();
      const store = mockStore({ crossVisualizer });

      wrapper = mount(<CrossVisualizer store={store}/>);
    });

    test('it should render loading spinner while loading', () => {
      const spinner = wrapper.find('[data-test="loading"]');
      expect(spinner.exists()).toBe(true);
    });

  });

});

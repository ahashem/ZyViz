import React from 'react';
import module from '../CrossVisualizer.module';
import { OrdersAPI } from '../../../utils/API';

// import CrossVisualizer from '../CrossVisualizer';

jest.mock('../../../utils/API');


beforeAll(() => {
  const mockStore = {
    getState: () => ({
      CrossVisualizer: {},
    }),
  };

  module.config({
    name: 'CrossVisualizer',
    store: mockStore,
  });
});
describe('<CrossVisualizer /> Dashboard Module', () => {
  let generator;
  beforeEach(() => {
    OrdersAPI.getOrders.mockClear();
    generator = module.actions.getOrdersData();
  });

  test('it should loading before getting orders', () => {
    expect(generator.next().value).toEqual({
      loading: true,
    });
  });

  test('it should return all orders and save it to the state', async () => {
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
    OrdersAPI.getOrders.mockReturnValue(new Promise((resolve) => {
      resolve(mockOrders);
    }));
    generator.next();
    const allOrders = await generator.next().value;
    expect(allOrders).toEqual(mockOrders);
  });

  test('it should handle returning error from API', async () => {
    generator.next();

    OrdersAPI.getOrders.mockReturnValue(new Promise((resolve, reject) => {
      const error = {
        errorCode: 500,
        errorMsg: 'Sorry, an error has occurred',
      };
      reject(new Error(JSON.stringify(error)));
    }));

    const allOrders = await generator.next().value;

    expect(generator.next(allOrders).value).toEqual({
      error: true,
      errorMsg: 'Sorry, an error has occurred',
      loading: false,
    });
  });

  test('it should finish loading after getting orders', () => {
    generator.next();
    generator.next();

    expect(generator.next().value).toEqual({
      loading: false,
    });
  });
});

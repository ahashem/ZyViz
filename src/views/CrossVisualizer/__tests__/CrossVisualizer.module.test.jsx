import React from 'react';
import module from '../CrossVisualizer.module';
import { OrdersAPI } from '../../../utils/API';
import mockOrders from '../../../utils/test-utils/mock-test-orders';

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

  test('it should finish loading after getting orders', async () => {
    generator.next();
    OrdersAPI.getOrders.mockReturnValue(new Promise((resolve) => {
      resolve(mockOrders);
    }));

    const ordersData = await generator.next().value;

    expect(generator.next(ordersData).value).toHaveProperty('loading', false);
  });
});

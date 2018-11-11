import React from 'react';
import module from '../CrossVisualizerTabbed.module';
import { OrdersAPI } from '../../../utils/API';
import mockOrders from '../../../utils/test-utils/mock-test-orders';
import { crossFilterMock, dimensionsMock } from '../../../utils/test-utils';

jest.mock('../../../utils/API');


beforeAll(() => {
  const mockStore = {
    getState: () => ({
      crossVisualizerTabbed: {
        orders: crossFilterMock,
        dimensions: dimensionsMock
      },
    }),
  };

  module.config({
    name: 'crossVisualizerTabbed',
    store: mockStore,
  });
});
describe('<CrossVisualizer /> Dashboard Module', () => {
  describe('Get Orders API', () => {
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

  describe('Update Dimensions on Filter', () => {
    let generator;
    beforeEach(() => {
      generator = module.actions.updateFilters;
    });

    test('it should not update store if no dimension were provided', async () => {
      //dimension, filterKey, clear
      // generator();
      expect(generator().next().value).toBeFalsy();
    });

    test('it should update store if no dimension were provided', async () => {
      const dimension = 'ordersByPaymentMethod';
      const filterKey = 'Cash';
      expect(generator(dimension, filterKey).next().value).toHaveProperty('dimensions');
    });
  });

});

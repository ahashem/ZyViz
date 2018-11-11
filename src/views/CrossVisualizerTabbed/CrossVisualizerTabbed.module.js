import { createModule } from 'speedux';

import { OrdersAPI } from '../../utils/API';
import crossfilter from '../../components/crossfilter/crossfilter';
import { GenerateDimensions, NormalizeData } from '../shared/visualizer-data-structure';


export default createModule('crossVisualizerTabbed', {

  /**
   * Initial State
   */
  state: {
    loading: false,
    error: false,
    errorMsg: '',
    ordersData: null,
    dimensions: null,
  },

  actions: {
    /**
     * this action get all Charts data
     */* getOrdersData() {
      yield {
        loading: true,
      };

      const ordersData = yield OrdersAPI.getOrders().catch(e => e);

      if (ordersData instanceof Error) {
        const { errorMsg } = JSON.parse(ordersData.message);
        yield {
          loading: false,
          error: true,
          errorMsg,
        };
      } else {
        const ordersCrossed = crossfilter(NormalizeData(ordersData));
        const dimensions = GenerateDimensions(ordersCrossed);
        yield {
          loading: false,
          ordersData: ordersCrossed,
          dimensions,
        };
      }
    },

    /**
     *
     * @param {string} dimension
     * @param {string|Array|function}filter
     * @param {boolean} clear
     *
     */* updateFilters(dimension, filter, clear) {
      if (!dimension || !filter) return;

      const dimensions = this.getState('dimensions');

      let updatedDimension;
      if (clear) {
        updatedDimension = dimensions[dimension].filterAll();
      } else {
        switch (true) {
          case (Array.isArray(filter)):
            updatedDimension = dimensions[dimension].filterRange([filter[0], filter[1]]);
            break;
          case (typeof filter === 'function'):
            updatedDimension = dimensions[dimension].filterFunction((value => filter(value)));
            break;
          default:
            updatedDimension = dimensions[dimension].filter(filter);
        }
      }

      yield {
        dimensions: {
          ...dimensions,
          updatedDimension,
        }
      };
    }
  },
});

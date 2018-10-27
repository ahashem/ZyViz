import { createModule } from 'speedux';

import { OrdersAPI } from '../../utils/API';
import crossfilter from '../../components/crossfilter/crossfilter';
import { GenerateDimensions, NormalizeData } from './visualizer-data-structure';


export default createModule('crossVisualizer', {

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
     */
    * getOrdersData() {
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
     * @param dimension
     * @param filterKey
     * @param clear
     *
     */* updateFilters(dimension, filterKey, clear) {
      if (!dimension || !filterKey) return;

      const dimensions = this.getState('dimensions');

      let updatedDimension;
      if (dimensions[dimension]) {
        updatedDimension = clear ? dimensions[dimension].filterAll() : dimensions[dimension].filter(filterKey);
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

import { createModule } from 'speedux';
import { OrdersAPI } from '../../utils/API';

export default createModule('CrossVisualizer', {

  state: {
    loading: false,
    error: false,
    errorMsg: '',
    ordersData: [],
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
        yield {
          loading: false,
          ordersData,
        };
      }
    },
  },

  handlers: {

  },
});

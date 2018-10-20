import { createModule } from 'speedux';
import { OrdersAPI } from '../utils/API';

export default createModule('CrossVisualizer', {

  state: {
    loading: false,
    error: false,
    errorMsg: '',
    chartsData: {},
  },

  actions: {
    /**
     * this action get all Charts data
     */
    * getOrdersData() {
      yield {
        loading: true,
      };

      const allData = yield OrdersAPI.getOrders().catch(e => e);

      if (allData instanceof Error) {
        const { errorMsg } = JSON.parse(allData.message);
        yield {
          loading: false,
          error: true,
          errorMsg,
        };
      }

      const chartsData = allData.data;

      if (chartsData) {
        yield {
          loading: false,
          chartsData,
        };
      }
    },
  },

  handlers: {

  },
});

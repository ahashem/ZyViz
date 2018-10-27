import { createModule } from 'speedux';
import { OrdersAPI } from '../../utils/API';
import crossfilter from '../../components/crossfilter/crossfilter';
import { utc } from 'moment';


const normalizeData = (ordersData) => {
  if (!ordersData || !ordersData.length) {
    return null;
  }
  const currencyParser = (value) => {
    if (!value || typeof value === 'number') {
      return value;
    }
    return parseFloat(value.replace(/[$,]+/g, ''));
  };

  // Normalize data for Crossfilter usage!
  ordersData.forEach(order => {
    order.orderAmount = currencyParser(order.orderAmount);
  });
  return ordersData;
};

const prepareOrdersCountData = (crossedOrdersData) => {
  // utils
  const filterAmountRange = (amount, min, max) => amount && amount > min && amount <= max;
  const filterDayTimeRange = (date, min, max) => {
    const hour = utc(date).hours();
    return hour > min && hour <= max;
  };


  // Serialize and group data using crossfilter to be
  // for-example: {key: 'paymentMethod', value: 20}

  // Orders by paymentMethod
  const ordersByPaymentMethodDimension = crossedOrdersData.dimension(record => record.paymentMethod);

  // Orders by orderAmount
  // Less than $10, $10-$20, $20-40, $40-$70, $70 or more
  const ordersByAmountDimension = crossedOrdersData.dimension(record => {
    const amount = record.orderAmount;

    switch (true) {
      case filterAmountRange(amount, 10, 20):
        return '$10-$20';
      case filterAmountRange(amount, 20, 40):
        return '$20-$40';
      case filterAmountRange(amount, 40, 70):
        return '$40-$70';
      case filterAmountRange(amount, 70, Infinity):
        return '$70 or more';
      case filterAmountRange(amount, -Infinity, 10):
        return 'Less than $10';
      default:
        return 'N/A';
    }
  });

  // Orders by Order time
  // Morning 6am-12pm, Afternoon 12-5pm, Evening 5-8pm, Night 8pm-6am
  const ordersByTimeDimension = crossedOrdersData.dimension(record => {
    const date = record.orderdate;

    switch (true) {
      case filterDayTimeRange(date, 6, 12):
        return 'Morning';
      case filterDayTimeRange(date, 12, 17):
        return 'Afternoon';
      case filterDayTimeRange(date, 17, 20):
        return 'Evening';
      case filterDayTimeRange(date, 0, 6):
      case filterDayTimeRange(date, 20, 23):
        return 'Night';
      // TODO: issue with some date filters!
      default:
        return 'N/A';
    }
  });

  return {
    ordersByPaymentMethodDimension,
    ordersByAmountDimension,
    ordersByTimeDimension,
  };

};


export default createModule('crossVisualizer', {

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
        const ordersCrossed = crossfilter(normalizeData(ordersData));
        const dimensions = prepareOrdersCountData(ordersCrossed);
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

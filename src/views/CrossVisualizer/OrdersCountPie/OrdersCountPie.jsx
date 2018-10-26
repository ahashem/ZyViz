import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { utc } from 'moment';
import PieChart from '../../../components/PieChart/PieChart';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';

/**
 * @component OrdersCountPie
 */
class OrdersCountPie extends Component {
  static propTypes = {
    orders: PropTypes.shape({}),
  };

  static defaultProps = {
    orders: {},
  };

  /**
   * Receive a crossfilter object and process it
   * @param crossedOrdersData
   * @return {{ordersByPaymentMethodData: Array<crossfilter.Grouping<crossfilter.NaturallyOrderedValue, crossfilter.NaturallyOrderedValue>>, orderBySizeData: Array<crossfilter.Grouping<crossfilter.NaturallyOrderedValue, crossfilter.NaturallyOrderedValue>>}}
   */
  prepareOrdersCountData = (crossedOrdersData) => {
    // Serialize and group data using crossfilter to be
    // for-example: {key: 'paymentMethod', value: 20}

    // Orders by paymentMethod
    const ordersByPaymentMethodDimension = crossedOrdersData.dimension(record => record.paymentMethod);
    const ordersByPaymentMethodData = ordersByPaymentMethodDimension.group().reduceCount().all();

    // utils
    const filterAmountRange = (amount, min, max) => amount && amount > min && amount <= max;
    const filterDayTimeRange = (date, min, max) => {
      const hour = utc(date).hours();
      return hour > min && hour <= max;
    };

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
    const ordersByAmountData = ordersByAmountDimension.group().reduceCount().all();

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
    const ordersByTimeData = ordersByTimeDimension.group().reduceCount().all();

    return {
      ordersByPaymentMethodData,
      ordersByAmountData,
      ordersByTimeData,
    };

  };

  render() {
    const { orders } = this.props;
    const ordersCrossed = orders ? this.prepareOrdersCountData(orders) : null;

    return (
      <div>
        <FlexGridRow justify="space-around" gutter={48}>

          <PieChart
            data={ordersCrossed && ordersCrossed.ordersByPaymentMethodData}
            x="key"
            y="value"
          />

          <PieChart
            data={ordersCrossed && ordersCrossed.ordersByAmountData}
            x="key"
            y="value"
          />

          <PieChart
            data={ordersCrossed && ordersCrossed.ordersByTimeData}
            x="key"
            y="value"
          />

        </FlexGridRow>
      </div>
    );
  }
}

export default OrdersCountPie;

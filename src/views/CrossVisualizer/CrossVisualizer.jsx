import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'speedux';
import { Spin } from 'antd';

import module from './CrossVisualizer.module';
import OrdersCountPie from './OrdersCountPie/OrdersCountPie';

import './CrossVisualizer.scss';
import { utc } from 'moment';


class CrossVisualizer extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getOrdersData: PropTypes.func
    }).isRequired,
    state: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      errorMsg: PropTypes.string,
      ordersData: PropTypes.shape({}),
      dimensions: PropTypes.shape({}),
    }).isRequired
  };

  state = {};

  componentDidMount() {
    const { actions } = this.props;
    actions.getOrdersData();
  }

  componentDidUpdate(prevProps) {
  }

  prepareOrdersData = (crossedOrdersData) => {
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

    const { state } = this.props;
      const { loading, ordersData, dimensions: dimensionsData } = state;

      const orders = (ordersData) ? ordersData : null;
      const dimensions = (dimensionsData) ? dimensionsData : null;

    return (
      <div>
        {loading ? (<Spin data-test="loading"/>)
          : (
            <React.Fragment>
              <h3>Orders by <br /><strong>payment method</strong></h3>
              <OrdersCountPie
                orders={orders}
                dimensions={dimensions}
              />
            </React.Fragment>
          )}
      </div>
    );
  }
}

export default connect(CrossVisualizer, module);

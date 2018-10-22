import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import PieChart from '../../../components/PieChart/PieChart';

/**
 *
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

    // Orders by orderAmount
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
        default:
          return 'Less than $10';
      }
    });
    const ordersByAmountData = ordersByAmountDimension.group().reduceCount().all();

    return {
      ordersByPaymentMethodData,
      ordersByAmountData,
    };

  };

  render() {
    const { orders } = this.props;
    const ordersCrossed = orders ? this.prepareOrdersCountData(orders) : null;

    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col span={4}>
            <PieChart
              data={ordersCrossed && ordersCrossed.ordersByPaymentMethodData}
              x="key"
              y="value"
            />
          </Col>
          <Col span={4}>
            <PieChart
              data={ordersCrossed && ordersCrossed.ordersByAmountData}
              x="key"
              y="value"
            />
          </Col>
          {/*<Col span={4}>
            <PieChart
              data={orders}
              x="key"
              y="value"
            />
          </Col>*/}
        </Row>
      </div>
    );
  }
}

export default OrdersCountPie;

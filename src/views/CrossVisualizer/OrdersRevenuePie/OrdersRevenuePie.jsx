import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../components/PieChart/PieChart';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';

/**
 * @component OrdersRevenuePie
 */
class OrdersRevenuePie extends Component {
  static propTypes = {
    orders: PropTypes.shape({}),
  };

  static defaultProps = {
    orders: {},
  };

  /**
   * Receive a crossfilter dimensions, create groups to use for charts
   * @param {Object} dimensions
   * @return {Object<Array<crossfilter.Grouping>>}
   */
  prepareOrdersCountData = (dimensions) => {
    // Serialize and group data using crossfilter to be
    // for-example: {key: 'paymentMethod', value: 20}

    // Orders by paymentMethod
    const ordersByPaymentMethod = dimensions.ordersByPaymentMethod;
    const ordersByPaymentMethodData = ordersByPaymentMethod.group().reduceSum(order => order.orderAmount).all();

    // Orders by orderAmount
    // Less than $10, $10-$20, $20-40, $40-$70, $70 or more
    const ordersBySize = dimensions.ordersBySize;
    const ordersByAmountData = ordersBySize.group().reduceSum(order => order.orderAmount).all();

    // Orders by Order time
    // Morning 6am-12pm, Afternoon 12-5pm, Evening 5-8pm, Night 8pm-6am
    const ordersByTimeOfDay = dimensions.ordersByTimeOfDay;
    const ordersByTimeData = ordersByTimeOfDay.group().reduceSum(order => order.orderAmount).all();

    return {
      ordersByPaymentMethodData,
      ordersByAmountData,
      ordersByTimeData,
    };

  };

  /**
   * Uplift filter triggers
   * @param {*|string} dimension
   * @param {Number} selectedKey
   * @param {Boolean} deselected
   */
  crossFilterSelected = (dimension, selectedKey, deselected = false) => {
    const { onFilter } = this.props;
    onFilter(dimension, selectedKey, deselected);
  };


  render() {
    const { dimensions } = this.props;
    const ordersCrossed = dimensions ? this.prepareOrdersCountData(dimensions) : null;

    return (
      <div>
        <FlexGridRow justify="space-around" gutter={48}>

          <PieChart
            data={ordersCrossed && ordersCrossed.ordersByPaymentMethodData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersByPaymentMethod',
              ordersCrossed.ordersByPaymentMethodData[selectedIndex].key,
              deselected
            )}
            x="key"
            y="value"
          />

          <PieChart
            data={ordersCrossed && ordersCrossed.ordersByAmountData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersBySize',
              ordersCrossed.ordersByAmountData[selectedIndex].key,
              deselected
            )}
            x="key"
            y="value"
          />

          <PieChart
            data={ordersCrossed && ordersCrossed.ordersByTimeData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersByTimeOfDay',
              ordersCrossed.ordersByTimeData[selectedIndex].key,
              deselected
            )}
            x="key"
            y="value"
          />

        </FlexGridRow>
      </div>
    );
  }
}

export default OrdersRevenuePie;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
   * @param dimensions
   * @return {{ordersByPaymentMethodData: Array<crossfilter.Grouping<crossfilter.NaturallyOrderedValue, crossfilter.NaturallyOrderedValue>>, orderBySizeData: Array<crossfilter.Grouping<crossfilter.NaturallyOrderedValue, crossfilter.NaturallyOrderedValue>>}}
   */
  prepareOrdersCountData = (dimensions) => {
    // Serialize and group data using crossfilter to be
    // for-example: {key: 'paymentMethod', value: 20}

    // Orders by paymentMethod
    const ordersByPaymentMethodDimension = dimensions.ordersByPaymentMethodDimension;
    const ordersByPaymentMethodData = ordersByPaymentMethodDimension.group().reduceCount().all();

    // Orders by orderAmount
    // Less than $10, $10-$20, $20-40, $40-$70, $70 or more
    const ordersByAmountDimension = dimensions.ordersByAmountDimension;
    const ordersByAmountData = ordersByAmountDimension.group().reduceCount().all();

    // Orders by Order time
    // Morning 6am-12pm, Afternoon 12-5pm, Evening 5-8pm, Night 8pm-6am
    const ordersByTimeDimension = dimensions.ordersByTimeDimension;
    const ordersByTimeData = ordersByTimeDimension.group().reduceCount().all();

    return {
      ordersByPaymentMethodData,
      ordersByAmountData,
      ordersByTimeData,
    };

  };

  /**
   *
   * @param {*|string} dimension
   * @param {Number} selectedKey
   * @param {Boolean} deselected
   */
  crossFilterSelected = (dimension, selectedKey, deselected = false) => {
    const { onFilter } = this.props;
    // console.log('selectedData', selectedKey);
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
              'ordersByPaymentMethodDimension',
              ordersCrossed.ordersByPaymentMethodData[selectedIndex].key,
              deselected
            )}
            x="key"
            y="value"
          />

          <PieChart
            data={ordersCrossed && ordersCrossed.ordersByAmountData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersByAmountDimension',
              ordersCrossed.ordersByAmountData[selectedIndex].key,
              deselected
            )}
            x="key"
            y="value"
          />

          <PieChart
            data={ordersCrossed && ordersCrossed.ordersByTimeData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersByTimeDimension',
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

export default OrdersCountPie;

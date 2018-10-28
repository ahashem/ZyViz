import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';
import TimeSeries from '../../../components/TimeSeries/TimeSeries';

/**
 * @component OrdersTimeSeries
 */
class OrdersTimeSeries extends Component {
  static propTypes = {
    orders: PropTypes.shape({}),
    dimension: PropTypes.shape({}),
  };

  static defaultProps = {
    orders: {},
    dimension: {},
  };

  /**
   * Receive a crossfilter dimensions, create groups to use for charts
   * @param {Object} dimensions
   * @return {Object<Array<crossfilter.Grouping>>}
   */
  prepareOrdersCountData = (dimensions) => {
    // Serialize and group data using crossfilter to be
    // for-example: {key: 'paymentMethod', value: 20}

    // Orders by Branch
    const ordersByDate = dimensions.ordersByDate;
    const ordersByDateData = ordersByDate.group().reduceCount().all();

    return {
      ordersByDateData,
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
    // console.log('selectedData', selectedKey);
    onFilter(dimension, selectedKey, deselected);
  };


  render() {
    const { dimensions } = this.props;
    const ordersCrossed = dimensions ? this.prepareOrdersCountData(dimensions) : null;

    ordersCrossed && console.log('ordersCrossed', ordersCrossed.ordersByDateData);
    return (
      <div>
        <FlexGridRow justify="space-around" gutter={48}>

          <TimeSeries
            maxPoints={150}
            data={ordersCrossed && ordersCrossed.ordersByDateData}
            x="key"
            y="value"
          />

        </FlexGridRow>
      </div>
    );
  }
}

export default OrdersTimeSeries;

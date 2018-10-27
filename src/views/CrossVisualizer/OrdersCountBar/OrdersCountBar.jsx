import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';
import BarChart from '../../../components/BarChart/BarChart';

/**
 * @component OrdersCountBar
 */
class OrdersCountBar extends Component {
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
   * @return {{ordersByBranchData: Array<crossfilter.Grouping<crossfilter.NaturallyOrderedValue, crossfilter.NaturallyOrderedValue>>, orderBySizeData: Array<crossfilter.Grouping<crossfilter.NaturallyOrderedValue, crossfilter.NaturallyOrderedValue>>}}
   */
  prepareOrdersCountData = (dimensions) => {
    // Serialize and group data using crossfilter to be
    // for-example: {key: 'paymentMethod', value: 20}

    // Orders by Branch
    const ordersByBranch = dimensions.ordersByBranch;
    const ordersByBranchData = ordersByBranch.group().reduceCount().all();

    // Orders by DeliveryArea
    const ordersByDeliveryArea = dimensions.ordersByDeliveryArea;
    const ordersByDeliveryAreaData = ordersByDeliveryArea.group().reduceCount().top(20);

    // Orders by Order Day of Week
    // Week days (Saturday - Sunday ...etc)
    const ordersByWeekDay = dimensions.ordersByWeekDay;
    const ordersByWeekDayData = ordersByWeekDay.group().reduceCount().all();

    return {
      ordersByBranchData,
      ordersByDeliveryAreaData,
      ordersByWeekDayData,
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

    return (
      <div>
        <FlexGridRow justify="space-around" gutter={48}>

          <BarChart
            data={ordersCrossed && ordersCrossed.ordersByBranchData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersByBranch',
              ordersCrossed.ordersByBranchData[selectedIndex].key,
              deselected
            )}
            x="key"
            y="value"
          />

          <BarChart
            data={ordersCrossed && ordersCrossed.ordersByDeliveryAreaData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersByDeliveryArea',
              ordersCrossed.ordersByDeliveryAreaData[selectedIndex].key,
              deselected
            )}
            x="key"
            y="value"
          />

          <BarChart
            data={ordersCrossed && ordersCrossed.ordersByWeekDayData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersByWeekDay',
              ordersCrossed.ordersByWeekDayData[selectedIndex].key,
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

export default OrdersCountBar;

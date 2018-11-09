import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';
import BarChart from '../../../components/BarChart/BarChart';
import { Col } from 'antd';

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
   * @return {Object<Array<crossfilter.Grouping>>}
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
    onFilter(dimension, selectedKey, deselected);
  };


  render() {
    const { dimensions } = this.props;
    const ordersCrossed = dimensions ? this.prepareOrdersCountData(dimensions) : null;

    return (
      <div>
        <FlexGridRow justify="space-around" gutter={8}>

          <Col
            xs={24}
            sm={24}
            md={8}
            lg={8}
          >
            <BarChart
              height={250}
              width={350}
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
              height={250}
              width={350}
              data={ordersCrossed && ordersCrossed.ordersByWeekDayData}
              onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                'ordersByWeekDay',
                ordersCrossed.ordersByWeekDayData[selectedIndex].key,
                deselected
              )}
              x="key"
              y="value"
            />
          </Col>

          <BarChart
            height={650}
            width={720}
            data={ordersCrossed && ordersCrossed.ordersByDeliveryAreaData}
            onClick={(selectedIndex, deselected) => this.crossFilterSelected(
              'ordersByDeliveryArea',
              ordersCrossed.ordersByDeliveryAreaData[selectedIndex].key,
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

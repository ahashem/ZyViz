import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';
import BarChart from '../../../components/BarChart/BarChart';
import { Col } from 'antd';

/**
 * @component OrdersRevenueBar
 */
class OrdersRevenueBar extends Component {
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
    const ordersByBranchData = ordersByBranch.group().reduceSum(order => order.orderAmount).all();

    // Orders by DeliveryArea
    const ordersByDeliveryArea = dimensions.ordersByDeliveryArea;
    const ordersByDeliveryAreaData = ordersByDeliveryArea.group().reduceSum(order => order.orderAmount).top(20);

    // Orders by Order Day of Week
    // Week days (Saturday - Sunday ...etc)
    const ordersByWeekDay = dimensions.ordersByWeekDay;
    const ordersByWeekDayData = ordersByWeekDay.group().reduceSum(order => order.orderAmount).all();

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
              labels={{ x: 'Branch', y: 'Revenue' }}
              axisFormats={{ y: (y) => (`$${y / 1000}k`) }}
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
              labels={{ x: 'Day of Week', y: 'Revenue' }}
              axisFormats={{ y: (y) => (`$${y / 1000}k`) }}
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
            labels={{ x: 'Delivery Area', y: 'Revenue' }}
            axisFormats={{ y: (y) => (`$${y / 1000}k`) }}
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

export default OrdersRevenueBar;

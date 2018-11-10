import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';
import BarChart from '../../../components/BarChart/BarChart';
import { Card, Col } from 'antd';
import { currencyTickFormat, shortenWeekDay } from '../../../utils/helpers';

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
    const { dimensions, loading } = this.props;
    const ordersCrossed = dimensions ? this.prepareOrdersCountData(dimensions) : null;

    return (
      <div>
        <FlexGridRow justify="space-around" gutter={8}>
          <Col
            xs={24}
            sm={24}
            md={8}
            lg={8}
            xl={8}
            xxl={8}
          >
            <Card title="Revenue By Branch and Week Day" bordered hoverable loading={loading}>
              <BarChart
                height={250}
                width={350}
                labels={{ x: 'Branch', y: 'Revenue' }}
                axisFormats={{
                  x: branch => (branch.toString().replace(/Branch /, '')),
                  y: currencyTickFormat
                }}
                data={ordersCrossed && ordersCrossed.ordersByBranchData}
                onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                  'ordersByBranch',
                  ordersCrossed.ordersByBranchData[selectedIndex].key,
                  deselected
                )}
                x="key"
                y="value"
                labelKey="value"
              />
              <BarChart
                height={250}
                width={350}
                labels={{ x: 'Day of Week', y: 'Revenue' }}
                axisFormats={{ x: shortenWeekDay, y: currencyTickFormat }}
                data={ordersCrossed && ordersCrossed.ordersByWeekDayData}
                onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                  'ordersByWeekDay',
                  ordersCrossed.ordersByWeekDayData[selectedIndex].key,
                  deselected
                )}
                x="key"
                y="value"
                labelKey="value"
              />
            </Card>
          </Col>

          <Card title="Top 20 Delivery Areas By Revenue" bordered hoverable loading={loading}>
            <BarChart
              horizontal
              labeledBars
              hiddenTicks={{ y: true }}
              height={500}
              width={720}
              labels={{ y: 'Delivery Area', x: 'Revenue' }}
              axisFormats={{ x: currencyTickFormat }}
              data={ordersCrossed && ordersCrossed.ordersByDeliveryAreaData}
              onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                'ordersByDeliveryArea',
                ordersCrossed.ordersByDeliveryAreaData[selectedIndex].key,
                deselected
              )}
              x="key"
              y="value"
              labelKey="key"
            />
          </Card>

        </FlexGridRow>
      </div>
    );
  }
}

export default OrdersRevenueBar;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';
import BarChart from '../../../components/BarChart/BarChart';
import { Card, Col } from 'antd';
import { shortenWeekDay } from '../../../utils/helpers';

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
            <Card title="Orders Count By Branch / Week Day" bordered hoverable loading={loading}>
              <BarChart
                height={250}
                width={350}
                labels={{ x: 'Branch', y: 'Orders Count' }}
                axisFormats={{ x: value => (value.toString().replace(/Branch /, '')) }}
                data={ordersCrossed && ordersCrossed.ordersByBranchData}
                onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                  'ordersByBranch',
                  ordersCrossed.ordersByBranchData[`${selectedIndex}`].key,
                  deselected
                )}
                x="key"
                y="value"
                labelKey="value"
              />
              <BarChart
                height={250}
                width={350}
                labels={{ x: 'Week of Day', y: 'Orders Count' }}
                axisFormats={{ x: day => (shortenWeekDay(day)) }}
                data={ordersCrossed && ordersCrossed.ordersByWeekDayData}
                onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                  'ordersByWeekDay',
                  ordersCrossed.ordersByWeekDayData[`${selectedIndex}`].key,
                  deselected
                )}
                x="key"
                y="value"
                labelKey="value"
              />
            </Card>

          </Col>

          <Card title="Top 20 Delivery Areas By Orders Count" bordered hoverable loading={loading}>
            <BarChart
              horizontal
              labeledBars
              hiddenTicks={{ y: true }}
              height={500}
              width={720}
              labels={{ y: 'Delivery Area', x: 'Orders Count' }}
              data={ordersCrossed && ordersCrossed.ordersByDeliveryAreaData}
              onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                'ordersByDeliveryArea',
                ordersCrossed.ordersByDeliveryAreaData[`${selectedIndex}`].key,
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

export default OrdersCountBar;

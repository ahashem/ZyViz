import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../../components/PieChart/PieChart';
import FlexGridRow from '../../../components/flex-wrapper/FlexGridRow';
import { Card } from 'antd';

/**
 * @component OrdersCountPie
 */
class OrdersCountPie extends Component {
  static propTypes = {
    orders: PropTypes.shape({}),
    dimensions: PropTypes.shape({}),
  };

  static defaultProps = {
    orders: {},
    dimensions: {},
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
    const ordersByPaymentMethodData = ordersByPaymentMethod.group().reduceCount().all();

    // Orders by orderAmount
    // Less than $10, $10-$20, $20-40, $40-$70, $70 or more
    const ordersBySize = dimensions.ordersBySize;
    const ordersByAmountData = ordersBySize.group().reduceCount().all();

    // Orders by Order time
    // Morning 6am-12pm, Afternoon 12-5pm, Evening 5-8pm, Night 8pm-6am
    const ordersByTimeOfDay = dimensions.ordersByTimeOfDay;
    const ordersByTimeData = ordersByTimeOfDay.group().reduceCount().all();

    // Orders by Order Day of Week
    // Week days (Saturday - Sunday ...etc)
    const ordersByWeekDay = dimensions.ordersByWeekDay;
    const ordersByWeekDayData = ordersByWeekDay.group().reduceCount().all();

    return {
      ordersByPaymentMethodData,
      ordersByAmountData,
      ordersByTimeData,
      ordersByWeekDayData
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
        <FlexGridRow justify="space-around" gutter={24}>

          <Card title="Orders Count By Payment Method" bordered hoverable loading={loading}>
            <PieChart
              name='ordersByPaymentMethod'
              data={ordersCrossed && ordersCrossed.ordersByPaymentMethodData}
              onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                'ordersByPaymentMethod',
                ordersCrossed.ordersByPaymentMethodData[`${selectedIndex}`].key,
                deselected
              )}
              x="key"
              y="value"
            />
          </Card>

          <Card title="Orders Count by Size" bordered hoverable loading={loading}>
            <PieChart
              name='ordersBySize'
              data={ordersCrossed && ordersCrossed.ordersByAmountData}
              onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                'ordersBySize',
                ordersCrossed.ordersByAmountData[`${selectedIndex}`].key,
                deselected
              )}
              x="key"
              y="value"
            />
          </Card>

          <Card title="Orders Count By Time of the Day" bordered hoverable loading={loading}>
            <PieChart
              name='ordersByTimeOfDay'
              data={ordersCrossed && ordersCrossed.ordersByTimeData}
              onClick={(selectedIndex, deselected) => this.crossFilterSelected(
                'ordersByTimeOfDay',
                ordersCrossed.ordersByTimeData[`${selectedIndex}`].key,
                deselected
              )}
              x="key"
              y="value"
            />
          </Card>

        </FlexGridRow>
      </div>
    );
  }
}

export default OrdersCountPie;

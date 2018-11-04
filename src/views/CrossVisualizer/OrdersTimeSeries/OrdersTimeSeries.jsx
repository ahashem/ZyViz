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

  _chartCount = 'chart-count';

  _chartSales = 'chart-sales';

  state = {
    // TODO: move to a module and update with all range or last 6-12 months of data!
    zoomDomains: {
      [`${this._chartCount}`]: { x: [new Date(Date.UTC(2017, 1, 1)), new Date(Date.UTC(2018, 1, 1))] },
      [`${this._chartSales}`]: { x: [new Date(Date.UTC(2017, 1, 1)), new Date(Date.UTC(2018, 1, 1))] },
    }
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
    const ordersByDateDataGroup = ordersByDate.group().reduceCount().all();

    const ordersByDateData = ordersByDateDataGroup.map(data => {
      return {
        x: (data.key instanceof Date) ? data.key : new Date(Date.parse(data.key)),
        y: isNaN(data.value) ? 0 : data.value
      };
    });
    const totalSaleByDateDataGroup = ordersByDate.group().reduceSum(order => order.orderAmount).all();
    const totalSaleByDateData = totalSaleByDateDataGroup.map(data => {
      return {
        x: (data.key instanceof Date) ? data.key : new Date(Date.parse(data.key)),
        y: isNaN(data.value) ? 0 : data.value
      };
    });

    return {
      ordersByDateData,
      totalSaleByDateData,
    };

  };

  /**
   * Uplift filter triggers
   * @param {*|string} name
   * @param {Array<Date>} dateRange
   * @param {*|string} dimension
   * @param {Number} selectedKey
   * @param {Boolean} deselected
   */
  crossFilterSelected = (name, dateRange, dimension, selectedKey, deselected = false) => {
    const { zoomDomains } = this.state;
    const { onFilter } = this.props;

    // Set equal `X`(Time Scale) ZoomDomains for all child TimeSeries charts reserving the `Y` scale as is
    const newZooms = {};
    for (const [key, value] of Object.entries(zoomDomains)) {
      newZooms[key] = {
        x: dateRange['x'],
        y: zoomDomains[key]['y'],
      };
    }
    const newZoomDomains = Object.assign({}, zoomDomains, newZooms);
    this.setState({
      zoomDomains: newZooms
    }, () => onFilter('ordersByDate', dateRange['x'], deselected));
  };


  render() {
    const { zoomDomains } = this.state;
    const { dimensions } = this.props;
    const ordersCrossed = dimensions ? this.prepareOrdersCountData(dimensions) : null;

    return (
      <div>
        <FlexGridRow justify="space-around" gutter={48}>

          {ordersCrossed && (
            <TimeSeries
              data={ordersCrossed.ordersByDateData}
              onFilter={this.crossFilterSelected}
              zoomDomain={zoomDomains[this._chartCount]}
              name={this._chartCount}
            />)}

          {ordersCrossed && (
            <TimeSeries
              data={ordersCrossed.totalSaleByDateData}
              onFilter={this.crossFilterSelected}
              zoomDomain={zoomDomains[this._chartSales]}
              name={this._chartSales}
            />)}

        </FlexGridRow>
      </div>
    );
  }
}

export default OrdersTimeSeries;

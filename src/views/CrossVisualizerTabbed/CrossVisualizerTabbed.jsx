import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'speedux';
import { Spin } from 'antd';

import module from './CrossVisualizerTabbed.module';
import OrdersCountPie from './OrdersCountPie/OrdersCountPie';

import './CrossVisualizer.scss';
import OrdersRevenuePie from './OrdersRevenuePie/OrdersRevenuePie';
import OrdersCountBar from './OrdersCountBar/OrdersCountBar';
import OrdersRevenueBar from './OrdersRevenueBar/OrdersRevenueBar';
import OrdersTimeSeries from './OrdersTimeSeries/OrdersTimeSeries';

class CrossVisualizerTabbed extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getOrdersData: PropTypes.func
    }).isRequired,
    state: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      errorMsg: PropTypes.string,
      ordersData: PropTypes.shape({}),
      dimensions: PropTypes.shape({}),
    }).isRequired
  };

  state = {};
  onFilter = (dimension, key, clearFilter = false) => {
    const { actions } = this.props;
    // console.log('data to crossFilter', dimension, key);
    actions.updateFilters(dimension, key, clearFilter);
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.getOrdersData();
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    const { state } = this.props;
    const { loading, ordersData, dimensions: dimensionsData } = state;

    const orders = (ordersData) ? ordersData : null;
    const dimensions = (dimensionsData) ? dimensionsData : null;

    return (
      <div>
        {loading ? (<Spin data-test="loading"/>)
          : (
            <React.Fragment>
              <OrdersCountBar
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
                loading={loading}
              />
              <OrdersRevenueBar
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
                loading={loading}
              />
              <OrdersCountPie
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
                loading={loading}
              />
              <OrdersRevenuePie
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
                loading={loading}
              />
              <OrdersTimeSeries
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
                loading={loading}
              />
            </React.Fragment>
          )}
      </div>
    );
  }
}

export default connect(CrossVisualizerTabbed, module);

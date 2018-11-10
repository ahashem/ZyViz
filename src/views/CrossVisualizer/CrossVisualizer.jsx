import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'speedux';
import { Spin } from 'antd';

import module from './CrossVisualizer.module';
import OrdersCountPie from './OrdersCountPie/OrdersCountPie';

import './CrossVisualizer.scss';
import OrdersRevenuePie from './OrdersRevenuePie/OrdersRevenuePie';
import OrdersCountBar from './OrdersCountBar/OrdersCountBar';
import OrdersRevenueBar from './OrdersRevenueBar/OrdersRevenueBar';
import OrdersTimeSeries from './OrdersTimeSeries/OrdersTimeSeries';

class CrossVisualizer extends Component {
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

  componentDidMount() {
    const { actions } = this.props;
    actions.getOrdersData();
  }

  componentDidUpdate(prevProps) {
  }

  onFilter = (dimension, key, clearFilter = false) => {
    const { actions } = this.props;
    // console.log('data to crossFilter', dimension, key);
    actions.updateFilters(dimension, key, clearFilter);
  };


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
              />
              <OrdersRevenueBar
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
              />
              <OrdersCountPie
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
              />
              <OrdersRevenuePie
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
              />
              <h3>Orders Count & Total Sales By Date</h3>
              <OrdersTimeSeries
                orders={orders}
                dimensions={dimensions}
                onFilter={this.onFilter}
              />
            </React.Fragment>
          )}
      </div>
    );
  }
}

export default connect(CrossVisualizer, module);

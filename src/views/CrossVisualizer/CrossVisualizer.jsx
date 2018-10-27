import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'speedux';
import { Spin } from 'antd';

import module from './CrossVisualizer.module';
import OrdersCountPie from './OrdersCountPie/OrdersCountPie';

import './CrossVisualizer.scss';

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
              <h3>Orders by <br /><strong>payment method</strong></h3>
              <OrdersCountPie
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

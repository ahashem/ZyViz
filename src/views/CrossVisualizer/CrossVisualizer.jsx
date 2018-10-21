import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'speedux';
import { Spin } from 'antd';
import crossfilter from '../../components/crossfilter/crossfilter';

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
      ordersData: PropTypes.arrayOf(PropTypes.shape({
        userid: PropTypes.string,
        orderid: PropTypes.number,
        orderAmount: PropTypes.string,
        orderdate: PropTypes.string,
        paymentMethod: PropTypes.string,
        branch: PropTypes.string,
        deliveryArea: PropTypes.string,
      }))
    }).isRequired
  };

  state = {};

  componentDidMount() {
    const { actions } = this.props;
    actions.getOrdersData();
  }

  componentDidUpdate(prevProps) {
  }

  prepareOrdersCountData = (ordersData) => {
    // Serialize data using crossfilter to be:
    // {key: paymentMethod, value: count}
    const crossedOrdersData = crossfilter(ordersData);
    const dimension = crossedOrdersData.dimension(record => record.paymentMethod);
    const categories = dimension.group().reduceCount();

    const data = categories.all();
    return {
      categories,
      dimension,
      data
    };

  };

  render() {

    const { state } = this.props;
    const { loading, ordersData } = state;

    const ordersCountData = (ordersData && ordersData.length) ? this.prepareOrdersCountData(ordersData) : null;

    return (
      <div>
        {loading ? (<Spin/>)
          : (
            <React.Fragment>
              <h3>Orders by <br /><strong>payment method</strong></h3>
              <OrdersCountPie
                orders={ordersCountData ? ordersCountData.data : []}
                payments={[]}
              />
            </React.Fragment>
          )}
      </div>
    );
  }
}

export default connect(CrossVisualizer, module);

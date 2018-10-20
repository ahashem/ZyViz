import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'speedux';
import { Spin, } from 'antd';

import module from './CrossVisualizer.module';
import OrdersCountPie from './OrdersCountPie/OrdersCountPie';

import './CrossVisualizer.scss';


class CrossVisualizer extends Component {
  static propTypes = {
    actions: PropTypes.shape({}),
    state: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      errorMsg: PropTypes.string,
    })
  };

  static defaultProps = {
    actions: {},
    state: {
      columns: [],
      allColumns: [],
      campaignsCount: 0,
      current: 1,
    },
    history: {},
    location: {},
  };

  state = {};

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  render() {

    const { state } = this.props;
    const { loading } = state;

    return (
      <div>
        {loading ? (<Spin/>)
          : (
            <React.Fragment>
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
              <OrdersCountPie
                orders={[]}
                payments={[]}
              />
            </React.Fragment>
          )}
      </div>
    );
  }
}

export default connect(CrossVisualizer, module);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import OrdersByPayment from './OrdersByPayment';

/**
 *
 */
class OrdersCountPie extends Component {
  static propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape({})),
    payments: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    orders: [],
    payments: [],
  };

  render() {
    const { orders } = this.props;

    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col span={4}>
            <OrdersByPayment
              data={orders}
              x="key"
              y="value"
            />
          </Col>
          <Col span={4}>
            <OrdersByPayment
              data={orders}
              x="key"
              y="value"
            />
          </Col>
          <Col span={4}>
            <OrdersByPayment
              data={orders}
              x="key"
              y="value"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default OrdersCountPie;

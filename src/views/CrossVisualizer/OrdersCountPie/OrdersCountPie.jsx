import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import OrdersByPayment from './OrdersByPayment';

const mockData = [
  { x: 'Cats', y: 35 },
  { x: 'Dogs', y: 40 },
  { x: 'Birds', y: 55 }
];

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
    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col span={4}>
            <OrdersByPayment data={mockData} />
          </Col>
          <Col span={4}>
            <OrdersByPayment data={mockData} />
          </Col>
          <Col span={4}>
            <OrdersByPayment data={mockData} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default OrdersCountPie;

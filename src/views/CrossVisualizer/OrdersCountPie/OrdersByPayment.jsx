import React from 'react';
import PropTypes from 'prop-types';

import PieChart from '../../../components/PieChart/PieChart';

/**
 * Abstract Pie Chart wrapper
 * @param data
 */
const OrdersByPayment = ({ data, ...rest }) => {
  return (
    <PieChart
      data={data}
      {...rest}
    />
  );
};

OrdersByPayment.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

OrdersByPayment.defaultProps = {
  data: [],
};

export default OrdersByPayment;

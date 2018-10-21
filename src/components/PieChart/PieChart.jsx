import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie } from 'victory';

/**
 * Abstract Pie Chart wrapper
 * @param data
 */
const PieChart = ({ data, ...rest }) => {
  return (
    <VictoryPie
      data={data}
      {...rest}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

PieChart.defaultProps = {
  data: [],
};

export default PieChart;

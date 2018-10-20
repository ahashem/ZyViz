import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie } from 'victory';

/**
 * Abstract Pie Chart wrapper
 * @param children
 * @param data
 */
const PieChart = ({ data }) => {
  return (
    <VictoryPie
      data={data}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

PieChart.defaultProps = {
  data: [
    { x: 'Cats', y: 35 },
    { x: 'Dogs', y: 40 },
    { x: 'Birds', y: 55 }
  ]
};

export default PieChart;

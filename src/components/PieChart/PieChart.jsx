import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryTheme } from 'victory';

function styleChartSlices(selected) {
  const fill = selected.style && selected.style.fill;
  return fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
};

/**
 * Abstract Pie Chart wrapper
 * @param data
 * @param {function} onClick
 */
const PieChart = ({ data, onClick, ...rest }) => {
  return (
    <VictoryPie
      theme={VictoryTheme.material}
      data={data}
      {...rest}
      events={[{
        target: 'data',
        eventHandlers: {
          onClick: () => {
            return [
              {
                target: 'data',
                mutation: (props) => {
                  styleChartSlices(props);
                  return onClick(props.index);
                }
              }, {
                target: 'labels',
                mutation: (props) => {
                  return props.text === 'clicked' ? null : { text: 'clicked' };
                }
              }
            ];
          }
        }
      }]}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onClick: PropTypes.func,
};

PieChart.defaultProps = {
  data: [],
  onClick: () => {
  },
};

export default PieChart;

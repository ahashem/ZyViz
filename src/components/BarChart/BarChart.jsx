import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';

function styleChartSlices(selected) {
  const fill = selected.style && selected.style.fill;
  return fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
}

/**
 * Abstract Pie Chart wrapper
 * @param data
 * @param {function} onClick
 * @param {Object} axisFormats - tickFormat function for both the xAxis and yAxis
 */
const BarChart = ({ data, onClick, axisFormats, ...rest }) => {
  return (
    <VictoryChart
      domainPadding={25}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        tickFormat={axisFormats.y}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={axisFormats.x}
      />
      <VictoryBar
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
    </VictoryChart>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onClick: PropTypes.func,
  axisFormats: {
    x: PropTypes.func,
    y: PropTypes.func,
  }
};

BarChart.defaultProps = {
  data: [],
  onClick: () => {
  },
  axisFormats: {
    x: x => x,
    y: y => y,
  }
};

export default BarChart;

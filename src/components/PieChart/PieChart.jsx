import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie } from 'victory';

/**
 * Abstract Pie Chart wrapper
 * @param data
 */
const PieChart = ({ data, onClick, ...rest }) => {
  return (
    <VictoryPie
      data={data}
      {...rest}
      events={[{
        target: 'data',
        eventHandlers: {
          onClick: (e) => {
            console.log('event', e);
            return [
              {
                target: 'data',
                mutation: (props) => {
                  const fill = props.style && props.style.fill;
                  return fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
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

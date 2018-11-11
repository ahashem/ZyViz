import React from 'react';
import PropTypes from 'prop-types';

import { VictoryPie, VictoryTheme } from 'victory';

const styleChartSlices = (selected) => {
  const fill = selected.style && selected.style.fill;
  return fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
};

/**
 * Manage label appearance by splitting on closest space or after
 * @param label
 * @return {*}
 */
const labelSplitter = (label) => {
  if (label.search(' ') <= 9) {
    return label.replace(' ', '\n');
  }
  return label.slice(0, 7) + '\n' + label.slice(7);
};

/**
 * Abstract Pie Chart wrapper
 * @param data
 * @param {function} onClick
 * @param {string} labelKey
 * @param {string} name
 */
const PieChart = ({ data, onClick, labelKey, name, ...rest }) => {
  return (
    <VictoryPie
      name={name}
      theme={VictoryTheme.material}
      padding={80}
      colorScale="cool"
      labels={(data) => labelSplitter(`${data[labelKey]}`)}
      sortKey={labelKey}
      sortOrder="descending"
      events={[{
        target: 'data',
        eventHandlers: {
          onClick: () => {
            return [
              {
                target: 'data',
                mutation: (props) => {
                  onClick(props.index);
                  return (props) => styleChartSlices(props);
                }
              }, {
                target: 'labels',
                mutation: (props) => {
                  return (props) => props.style.fontWeight === 'bold' ? null : {
                    style: {
                      ...props.style,
                      fontWeight: 'bold'
                    }
                  };
                }
              }
            ];
          }
        }
      }]}
      data={data}
      {...rest}
    />
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onClick: PropTypes.func,
  labelKey: PropTypes.string,
  name: PropTypes.string,
};

PieChart.defaultProps = {
  data: [],
  onClick: () => {
  },
  labelKey: 'key',
  name: ''
};

export default PieChart;

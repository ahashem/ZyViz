import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory';

function styleChartSlices(selected) {
  const fill = selected.style && selected.style.fill;
  return fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
}

/**
 * Abstract Pie Chart wrapper
 * @param data
 * @param {function} onClick
 * @param {Object} axisFormats - tickFormat function for both the xAxis and yAxis
 * @param {Number} height - Chart wrapper height
 * @param {Number} width - Chart wrapper width
 * @param {Object} labels - Chart Axis Labels
 * @param {boolean} horizontal - Chart Bar orientation
 */
const BarChart = ({ data, onClick, axisFormats, height, width, labels, horizontal, ...rest }) => {
  return (
    <VictoryChart
      domainPadding={25}
      theme={VictoryTheme.material}
      height={height}
      width={width}
    >
      <VictoryAxis
        name={'xAxis'}
        label={labels.x || ''}
        style={{
          axisLabel: { padding: 30 }
        }}
        tickFormat={axisFormats.x}
        tickLabelComponent={horizontal ? <VictoryLabel/> : <VictoryLabel angle={40} style={{ fontSize: 11 }}/>}
      />
      <VictoryAxis
        dependentAxis
        name={'yAxis'}
        label={labels.y || ''}
        style={{
          axisLabel: { padding: horizontal ? 40 : 0 }
        }}
        tickFormat={axisFormats.y}
        axisLabelComponent={horizontal ? <VictoryLabel/> :
          <VictoryLabel angle={360} dy={-(height / 3)} style={{ fontSize: 13 }}/>}
      />
      <VictoryBar
        horizontal={horizontal}
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
                    // return props.text === 'clicked' ? null : { text: 'clicked' };
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
  },
  height: PropTypes.number,
  width: PropTypes.number,
  labels: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }),
  horizontal: PropTypes.bool,
};

BarChart.defaultProps = {
  data: [],
  onClick: () => {
  },
  axisFormats: {
    x: x => x,
    y: y => y,
  },
  height: 400,
  width: 450,
  labels: {
    x: '',
    y: '',
  },
  horizontal: false
};

export default BarChart;

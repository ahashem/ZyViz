import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory';

const BaseFontSize = 10;

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
 * @param {Object<boolean>} hiddenTicks - Hide tick labels
 * @param {boolean} labeledBars - Display label on bar
 * @param {string} labelKey - LabelKey to use for every bar
 */
const BarChart = ({
                    data, onClick, axisFormats, height, width, labels, horizontal, labeledBars,
                    labelKey, hiddenTicks, ...rest,
                  }) => {
  return (
    <VictoryChart
      domainPadding={25}
      theme={VictoryTheme.material}
      height={height}
      width={width}
      padding={horizontal ? { top: 50, bottom: 50, left: 80, right: 50 } : 60}
    >
      <VictoryAxis
        name={'xAxis'}
        label={labels.x || ''}
        style={{
          axisLabel: { padding: 30 }
        }}
        tickFormat={axisFormats.x}
        tickLabelComponent={<VictoryLabel style={{ fontSize: hiddenTicks.x ? 0 : BaseFontSize }}/>}
      />
      <VictoryAxis
        dependentAxis
        name={'yAxis'}
        label={labels.y || ''}
        style={{
          axisLabel: { padding: 30 }
        }}
        tickFormat={axisFormats.y}
        tickLabelComponent={<VictoryLabel style={{ fontSize: hiddenTicks.y ? 0 : BaseFontSize }}/>}
      />
      <VictoryBar
        horizontal={horizontal}
        data={data}
        // animate={{
        //   duration: 600,
        //   onLoad: { duration: 1200 }
        // }}
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
        labels={labeledBars ? ((data) => data[`${labelKey}`]) : null}
        style={{ labels: { fill: 'white', fontSize: BaseFontSize } }}
        labelComponent={horizontal ? <VictoryLabel x={95}/> : <VictoryLabel dy={30}/>}
        {...rest}
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
  hiddenTicks: PropTypes.shape({
    x: PropTypes.bool,
    y: PropTypes.bool,
  }),
  labeledBars: PropTypes.bool,
  labelKey: PropTypes.string,
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
  horizontal: false,
  hiddenTicks: { x: false, y: false },
  labeledBars: false,
  labelKey: null
};

export default BarChart;

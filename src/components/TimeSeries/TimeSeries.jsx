import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory';

class TimeSeries extends Component {

  handleZoom = (domain, props) => {
    const { onFilter } = this.props;
    onFilter && onFilter(props.name, domain);
  };

  render() {
    const { data, name, zoomDomain } = this.props;
    return (
      <div>
        <VictoryChart
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryZoomContainer
              name={name}
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={this.handleZoom}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: 'tomato' }
            }}
            data={data}
          />

        </VictoryChart>
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600} height={100} scale={{ x: 'time' }}
          containerComponent={
            <VictoryBrushContainer
              name={name}
              brushDimension="x"
              brushDomain={zoomDomain}
              onBrushDomainChange={this.handleZoom}
            />
          }
        >
          <VictoryAxis
            tickFormat={(x) => new Date(x).getFullYear()}
          />
          <VictoryLine
            style={{
              data: { stroke: 'gray' }
            }}
            data={data}
          />
        </VictoryChart>
      </div>
    );
  }
}

TimeSeries.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  name: PropTypes.string.isRequired,
  zoomDomain: PropTypes.shape({
    x: PropTypes.array,
    y: PropTypes.array,
  }).isRequired,
};

TimeSeries.defaultProps = {
  data: [],
};

export default TimeSeries;

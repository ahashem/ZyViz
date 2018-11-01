import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory';

class TimeSeries extends Component {

  state = {
    zoomDomain: { x: [new Date(2017, 1, 1), new Date(2018, 1, 1)] }
  };

  handleZoom = (domain) => {
    this.setState({ zoomDomain: domain });
  };

  render() {
    const { zoomDomain } = this.state;
    const { data } = this.props;
    return (
      <div>
        <VictoryChart
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryZoomContainer
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
};

TimeSeries.defaultProps = {
  data: [],
};

export default TimeSeries;

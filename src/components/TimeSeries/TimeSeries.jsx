import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { utc } from 'moment';

import { VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLine, VictoryTheme } from 'victory';

class TimeSeries extends Component {

  state = {
    zoomDomain: { x: [new Date(1990, 1, 1), new Date(2019, 1, 1)] }
  };

  handleZoom = (domain) => {
    this.setState({ zoomDomain: domain });
  };

  render() {
    const { zoomDomain } = this.state;
    let { data, ...rest } = this.props;

    return (
      <VictoryChart
        scale={{ x: 'time' }}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={this.handleZoom}
          />
        }
      >
        <VictoryAxis
          tickFormat={(x) => utc(x).toDate().getFullYear()}
        />
        <VictoryLine
          style={{
            data: { stroke: 'tomato' }
          }}
          theme={VictoryTheme.material}
          data={data}
          {...rest}
        />
      </VictoryChart>
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

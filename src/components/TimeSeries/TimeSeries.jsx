import React, { Component } from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import round from 'lodash/round';

import { VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLine, VictoryTheme } from 'victory';

class TimeSeries extends Component {

  state = {
    zoomedXDomain: [],
  };

  componentDidMount() {
    const { data } = this.props;

    const entireDomain = this.getEntireDomain(data);
    this.setState({
      zoomedXDomain: entireDomain.x,
    });
  }

  getEntireDomain = (data) => {
    if (!data) {
      return {
        y: [],
        x: []
      };
    }
    return {
      //y: [minBy(data, d => d.y).y, maxBy(data, d => d.y).y],
      x: [data[0].x, last(data).x]
    };
  };

  getZoomFactor() {
    const { zoomedXDomain } = this.state;
    const factor = 10 / (zoomedXDomain[1] - zoomedXDomain[0]);
    return round(factor, factor < 3 ? 1 : 0);
  }

  styleChartSlices = (selected) => {
    const fill = selected.style && selected.style.fill;
    return fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
  };

  onDomainChange = (domain) => {
    this.setState({
      zoomedXDomain: domain.x,
    });
  };

  render() {
    const { zoomedXDomain } = this.state;
    let { data, ...rest } = this.props;

    return (
      <VictoryChart
        scale={{ x: 'time' }}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomedXDomain}
            onBrushDomainChange={this.onDomainChange}
          />
        }
      >
        <VictoryAxis
          tickFormat={(x) => new Date(x).getFullYear()}
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

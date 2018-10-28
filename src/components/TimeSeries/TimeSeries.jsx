import React, { Component } from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import round from 'lodash/round';

import { VictoryChart, VictoryTheme, VictoryZoomContainer } from 'victory';

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
      y: [minBy(data, d => d.y).y, maxBy(data, d => d.y).y],
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

  getData = () => {
    const { zoomedXDomain } = this.state;
    const { data, maxPoints } = this.props;

    const filtered = data.filter(
      (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));

    if (filtered.length > maxPoints) {
      const k = Math.ceil(filtered.length / maxPoints);
      return filtered.filter(
        (d, i) => ((i % k) === 0)
      );
    }
    return filtered;
  };

  render() {
    let { data, ...rest } = this.props;

    return (
      <VictoryChart
        containerComponent={
          <VictoryZoomContainer
            onZoomDomainChange={this.onDomainChange}
            zoomDimension="x"
            minimumZoom={data ? { x: 1 / data.length } : { x: 1 / 1000 }}
          />
        }
        theme={VictoryTheme.material}
        data={data && this.getData}
        scale={{ x: 'time' }}
        {...rest}
      />
    );
  }
}

TimeSeries.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  maxPoints: PropTypes.number,
};

TimeSeries.defaultProps = {
  data: [],
  maxPoints: 150,
};

export default TimeSeries;
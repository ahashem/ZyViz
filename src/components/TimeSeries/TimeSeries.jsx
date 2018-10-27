import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { last, maxBy, minBy, round } from 'lodash';

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
    let { data, onClick, ...rest } = this.props;

    return (
      <VictoryChart
        containerComponent={
          <VictoryZoomContainer
            onZoomDomainChange={this.onDomainChange}
            zoomDimension="x"
            minimumZoom={{ x: 1 / data.length }}
          />
        }
        theme={VictoryTheme.material}
        data={this.getData}
        events={[{
          target: 'data',
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: 'data',
                  mutation: (props) => {
                    this.styleChartSlices(props);
                    return onClick(props.index);
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
        {...rest}
      />
    );
  }
}

TimeSeries.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onClick: PropTypes.func,
};

TimeSeries.defaultProps = {
  data: [],
  onClick: () => {
  },
};

export default TimeSeries;

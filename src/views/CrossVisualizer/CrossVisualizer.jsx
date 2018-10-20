import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'speedux';
import {
  Spin,
} from 'antd';

import './CrossVisualizer.scss';
import module from './CrossVisualizer.module';
import PieChart from '../../components/PieChart/PieChart';


class CrossVisualizer extends Component {
  static propTypes = {
    actions: PropTypes.shape({}),
    state: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      errorMsg: PropTypes.string,
    })
  };

  static defaultProps = {
    actions: {},
    state: {
      columns: [],
      allColumns: [],
      campaignsCount: 0,
      current: 1,
    },
    history: {},
    location: {},
  };

  state = {};

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  render() {

    const { state } = this.props;
    const { loading } = state;

    return (
      <div>
        {loading ? (
            <Spin/>
          )
          : (
            <PieChart
            />
          )}
      </div>
    );
  }
}

export default connect(CrossVisualizer, module);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'speedux';
import {
  Spin,
} from 'antd';

import './style.scss';
import module from './CrossVisualizer.module';


class CrossVisualizer extends Component {
  static propTypes = {
    actions: PropTypes.shape({
    }),
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

  state = {

  };

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  render() {

    return (
      <div>
        <div>All Charts will render here</div>
        <Spin />
      </div>
    );
  }
}

export default connect(CrossVisualizer, module);

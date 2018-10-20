import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Header } = Layout;

/**
 * Application Header Layout wrapper
 * @param {Array} children
 */
const AppHeader = ({ children }) => (
  <Header
    id="app-header"
    style={{ background: '#fff', padding: 0 }}
  >
    {children}
  </Header>
);

AppHeader.propTypes = {
  children: PropTypes.node,
};

AppHeader.defaultProps = {
  children: [],
};

export default AppHeader;

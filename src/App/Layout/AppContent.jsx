import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Content } = Layout;

/**
 * Application Content Layout wrapper
 * @param {Array} children
 */
const AppContent = ({ children }) => (
  <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
    {children}
  </Content>
);

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContent;

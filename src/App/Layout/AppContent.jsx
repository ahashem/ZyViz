import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Content } = Layout;

/**
 * Application Content Layout wrapper
 * @param {Array} children
 */
const AppContent = ({ children }) => (
  <Content style={{ marginBottom: 50, padding: '20px 12px 12px 12px', background: '#ECECEC', minHeight: '100vh' }}>
    {children}
  </Content>
);

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContent;

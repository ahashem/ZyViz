import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu } from 'antd';

const { Sider } = Layout;

/**
 * Application Sidebar wrapper
 * @param {Array} children
 * @param {boolean} collapsed
 * @param {function} onCollapse
 */
const AppSidebar = ({ children, collapsed, onCollapse }) => (
  <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={onCollapse}
  >
    {/*Dummy Menu - Actually no use of it but a simple style!*/}
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Icon type="dashboard"/>
        <span>Dashboard</span>
      </Menu.Item>
    </Menu>
    {children}
  </Sider>
);

AppSidebar.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func
};

AppSidebar.defaultProps = {
  children: [],
  collapsed: false,
  onCollapse: () => {}
};

export default AppSidebar;

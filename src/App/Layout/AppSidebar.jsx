import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

/**
 * Application Sidebar wrapper
 * @param {Array} children
 * @param {boolean} collapsed
 * @param {function} onCollapse
 * @param {function} onClick
 * @param {string} currentMenu
 */
const AppSidebar = ({ children, collapsed, onCollapse, onClick, currentMenu }) => (
  <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={onCollapse}
  >
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['dashboard']}
      selectedKeys={[currentMenu]}
      onClick={onClick}
    >
      <Menu.Item key="dashboard">
        <Icon type="dashboard"/>
        <Link to='/'>
          <span>Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="tabbed">
        <Icon type="project"/>
        <Link to='/tabbed'>
          <span>Tabbed Dashboard</span>
        </Link>
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
  onCollapse: () => {
  }
};

export default AppSidebar;

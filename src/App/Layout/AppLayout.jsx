import React, { Component } from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppSidebar from './AppSidebar';

/**
 * Application layout using AntD layout components
 */
class AppLayout extends Component {
  state = {
    collapsed: true,
    currentMenuKey: 'dashboard',
  };

  /**
   * Toggle Side menu view
   */
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  /**
   * Handle Menu click and selected Item
   * @param e
   */
  onMenuClick = (e) => {
    this.setState({
      currentMenuKey: e.key,
    });
  };

  render() {
    const { collapsed, currentMenuKey } = this.state;
    const renderHeader = false;

    return (
      <Layout>
        {Boolean(process.env.REACT_APP_SIDE_MENU) ? (
            <AppSidebar
              collapsed={collapsed}
              onCollapse={this.onCollapse}
              onClick={this.onMenuClick}
              currentMenu={currentMenuKey}
            />
          ) :
          ''
        }
        <Layout>
          {renderHeader ? <AppHeader/> : ''}
          <AppContent>
            {this.props.children}
          </AppContent>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;

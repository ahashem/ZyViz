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
    collapsed: false,
  };

  /**
   * Toggle Side menu view
   */
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const renderHeader = false;

    return (
      <Layout>
        {process.env.REACT_APP_SIDE_MENU ? (
            <AppSidebar collapsed={this.state.collapsed} onCollapse={this.onCollapse}/>
          ) :
          ''
        }
        <Layout>
          {renderHeader ? <AppHeader /> : ''}
          <AppContent>
            {this.props.children}
          </AppContent>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;

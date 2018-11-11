import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import CrossVisualizer from './views/CrossVisualizer/CrossVisualizer';
import CrossVisualizerTabbed from './views/CrossVisualizerTabbed/CrossVisualizerTabbed';

const AppRouter = () => (
  <Switch>
    <Route exact path='/' component={CrossVisualizer}/>
    <Route exact path='/tabbed' component={CrossVisualizerTabbed}/>

    <Route component={NotFound}/>
  </Switch>
);


export default AppRouter;

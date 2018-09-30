import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import createHistory from 'history/createBrowserHistory';

// components
import Dashboard from '../components/Dashboard';
import Page404 from '../components/Page404';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Dashboard} exact={true} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route component={Page404} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;

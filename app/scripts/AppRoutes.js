// import * as React from 'react';
// import { Router, Route, browserHistory } from 'react-router';

// import {BuildsIndex} from './BuildsIndex.tsx'
// import {BuildPage} from './BuildPage.tsx'

(function () {
  let {Router, browserHistory, Route} = window.ReactRouter
  let {Component} = window.React
  let {BuildPage, BuildsIndex} = window

  class AppRoutes extends Component {
    render () {
      return (
        <Router history={browserHistory}>
          <Route path='/' component={BuildsIndex} />
          <Route path='/builds/:buildId' component={BuildPage} />
        </Router>
      )
    }
  }

  window.AppRoutes = AppRoutes
})()

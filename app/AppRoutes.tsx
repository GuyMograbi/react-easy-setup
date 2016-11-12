import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';


import {BuildsIndex} from './BuildsIndex.tsx'
import {BuildPage} from './BuildPage.tsx'


export class AppRoutes extends React.Component<{},{}>{
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/" component={BuildsIndex}/>
        <Route path="/builds/:buildId" component={BuildPage}/>
      </Router>
    )
  }
}

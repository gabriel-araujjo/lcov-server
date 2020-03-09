import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import File from './coverage/file'
import Error from './components/error';
import Layout from './layout';

function Dummy({match: {params}}) {
  console.log(params)
  return <h1> Dummy </h1>
}

export default (  
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/:rep([a-z0-9\-_./]+)/-/tree/:com([^/]+)/:dir([a-z0-9\-_./]+)?" component={Dummy} />
        <Route path="/:rep([a-z0-9\-_\.\/]+)/-/blob/:com([^/]+)/:file([a-z0-9\-_\.\/]+)?" component={File} />
        {/* <Route path="/:dir/:name/blob/:com/*" component={Dummy} />
        <Route path="/:dir/:name" component={Dummy} />
        <Route path="/coverage/:source/:owner/:name/:file" component={File} />
        <Route path="/coverage/:source/:owner/:name" component={Coverage} />
        <Route path="/coverage/:source/:owner/:page?" component={List} />
        <Route path="/coverage/:page?" component={List} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/" component={Main} /> */}
        <Route path='*' component={Error} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

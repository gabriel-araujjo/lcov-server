import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './layout';
import Main from './main';
import Feed from './coverage/feed';
import List from './coverage/list';
import Coverage from './coverage/coverage';
import File from './coverage/file';
import Error from './components/error';

function Dummy({match: {params}}) {
  console.log(params)
  return <h1> Dummy </h1>
}

export default (  
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/:rep([a-zA-Z0-9\\-_\\.\\/]+)/-/tree/:com/:dir([a-zA-Z0-9\\-_\\.\\/]+)?" component={Dummy} />
        <Route path="/:rep([a-zA-Z0-9\\-_\\.\\/]+)/-/blob/:com/:dir([a-zA-Z0-9\\-_\\.\\/]+)?" component={Dummy} />
        {/* <Route path="/:dir/:name/blob/:com/*" component={Dummy} />
        <Route path="/:dir/:name" component={Dummy} />
        <Route path="/coverage/:source/:owner/:name/:file" component={File} />
        <Route path="/coverage/:source/:owner/:name" component={Coverage} />
        <Route path="/coverage/:source/:owner/:page?" component={List} />
        <Route path="/coverage/:page?" component={List} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/" component={Main} /> */}
        <Route path="*" component={Error} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

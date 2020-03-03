import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {baseUrl} from '../lib/gitlab'
import './header.css'

const RepositoryInfo = props => {
  const {rep, typ} = props.match.params;
  const title = typ == 'blob' ? 'File Coverage Report' : 'Coverage Report';
  return (
    <React.Fragment>
      <h1 className='header'>{title}</h1>
      <h2 className='header'><a href={baseUrl() + '/' + rep}>{rep}</a></h2>
    </React.Fragment>
  );
};

const MainHeader = () => <h1>Main Header</h1>;

export default () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route path='/:rep([a-z0-9\-_./]+)/-/:typ(tree|blob)/*' component={RepositoryInfo} />
          <Route path='*' component={MainHeader} />
        </Switch>
    </BrowserRouter>
  );
};

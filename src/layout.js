import React from 'react';
import PropTypes from 'prop-types';
import { version } from '../package.json';
import Header from './components/header';

class Layout extends React.Component {
  render () {
    const { children } = this.props;

    return (
      <React.Fragment>
        <header className='col-2'><Header/></header>
        { children }
        <footer className='col-2'>
          <div>
            <a className="text-black" target="_blank" rel="noopener noreferrer" href="https://github.com/gabrielcsapo/lcov-server">Source</a>
            &nbsp;·&nbsp;
            <a className="text-black" target="_blank" rel="noopener noreferrer" href="https://github.com/gabrielcsapo/lcov-server/issues">Bugs</a>
            &nbsp;·&nbsp;
            <a className="text-black" target="_blank" rel="noopener noreferrer" href={ `https://github.com/gabrielcsapo/lcov-server/releases/${version}` }>v{version}</a>
          </div>
          <div className="text-black">
            <p>©{(new Date()).getFullYear()} <a target="_blank" rel="noopener noreferrer" href="http://gabrielcsapo.com">gabrielcsapo</a></p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;

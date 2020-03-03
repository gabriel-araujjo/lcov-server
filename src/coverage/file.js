import {json} from 'body-parser';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import CoverageChart from '../components/coverageChart';
import Error from '../components/error';
import {FileView, FileViewPlaceHolder} from '../components/fileView';
import NoCoverage from '../components/noCoverage';
import {getFileCoverage} from '../lib/covera.js'
import {getProjectBlob} from '../lib/gitlab.js';

// import {parseCoverage} from '../lib/util.js';

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: '', loading: true};
  }

  async componentDidMount() {
    let {rep, com, file} = this.props.match.params;

    if (!com) com = 'master';
    try {
      const blob = getProjectBlob(rep, com, file);
      const report = getFileCoverage(rep, com, file);
      const breadcrumb = file.slice('/');
      let tokenizedFile;
      if (report) 
        tokenizedFile = await FileView.tokenizeFile(await blob);
      this.setState({
        breadcrumb,
        tokenizedFile,
        rep: await report,
        loading: false
      });
    } catch (ex) {
      this.setState({error: ex.toString(), loading: false});
    }
  }

  render() {
    const {tokenizedFile, rep, error, loading} = this.state;
    let mainContent;
    let sideContent
    if (loading)
      mainContent = <FileViewPlaceHolder />;
    else if (error)
      mainContent = <Error error = { error } />;
    else if (!rep)
      mainContent = <NoCoverage />;
    else {
      const [sha, bra, rat, , , , , , lines, functions] = rep
      mainContent = <FileView tokenizedFile={tokenizedFile} lineCoverage={lines}/>;
    }

    return (<section className='col-2'>{mainContent}</section>);
  }

}

export default File;

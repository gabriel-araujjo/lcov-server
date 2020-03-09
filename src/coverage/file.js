import {json} from 'body-parser';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import CoverageChart from '../components/coverageChart';
import Error from '../components/error';
import {FileView, FileViewPlaceHolder} from '../components/fileView';
import NoCoverage from '../components/noCoverage';
import {getFileCoverage} from '../lib/covera'
import {getProjectBlob} from '../lib/gitlab';
import Breadcrumb from '../components/breadcrumb'

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
        report: await report,
        loading: false
      });
    } catch (ex) {
      this.setState({error: ex.toString(), loading: false});
    }
  }

  render() {
    const {tokenizedFile, report, error, loading} = this.state;
    let mainContent;
    let sideContent;
    let fileCoverage;
    if (loading)
      mainContent = <FileViewPlaceHolder />;
    else if (error)
      mainContent = <Error error = { error } />;
    else if (!report)
      mainContent = <NoCoverage />;
    else {
      const [sha, bra, rat, , , , , , lines, functions] = report;
      mainContent = <FileView
       tokenizedFile={tokenizedFile}
       lineCoverage={lines}/>;
      const fileBranchCount = lines.map(i => i[2]).reduce((a,b) => a + b, 0);
      const fileBranchHits = lines.map(i => i[3]).reduce((a,b) => a + b, 0);
      const percent = fileBranchHits / fileBranchCount * 100;
      const covClassName = percent > 85
        ? percent > 95
          ? 'high'
          : 'medium'
        : 'low';
      fileCoverage = <span className={`file-cov ${covClassName}`}>
        {percent.toFixed(1) + '%'}
      </span>;
    }

    const {rep, com, file} = this.props.match.params;

    return (<React.Fragment>
      <section className='col-2'>
        <h3 className='file breadcrumb'>
          <Breadcrumb rep={rep} com={com} file={file} />
          {fileCoverage}
        </h3>
        {mainContent}
      </section>
      <div class='col-3 charts'></div>
    </React.Fragment>);
  }

}

export default File;

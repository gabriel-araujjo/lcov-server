import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Select from 'react-select';

import CoverageChart from '../components/coverageChart';
import Table from '../components/table';
import Error from '../components/error';
import Loading from '../components/loading';

import { parseCoverage } from '../lib/util';
import './coverage.css';

const coverageGradient = ['#58B265', '#8AC564', '#D1D870', '#D1D870', '#D1D870', '#DFC780', '#E6B490', '#ECA9A1', '#F1B2C0']

class Coverage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      selectedBranch: '',
      loading: true
    };
  }

  async componentDidMount() {
   const { source, owner, name } = this.props.match.params;
   const url = `/api/coverage/${source}/${owner}/${name}`;
   try {
     const response = await fetch(url);
     const project = await response.json();

     this.setState({
       project: project[0],
       loading: false
     });
   } catch(ex) {
     this.setState({
       error: ex.toString(),
       loading: false
     });
   }
  }

  onChangeBranch(branch) {
    this.setState({
      selectedBranch: branch ? branch.value : ''
    });
  }
  reduceBuilds(build) {
    const { git, run_at, source_files } = build;
    let totalCoverage = source_files.map(({ lines={ found: 0, hit: 0 } }) => {
      return !lines.found ? 1 : lines.hit / lines.found;
    }, []).reduce((p, c) => p + c, 0) / source_files.length * 100;

    return {
      "Sha": `${git.commit}`.substr(0, 6),
      "Branch": git.git_branch || git.branch || <span style={{ color: "#9a9a9a" }}> unknown </span>, // backwards compatible
      "Coverage": `${totalCoverage.toFixed(2)}%`,
      "Commit": git.message,
      "Committer": git.committer_name,
      "Commit Time": Moment(git.committer_date * 1000).fromNow(),
      "Recieved": Moment(run_at).fromNow()
    };
  }

  reduceSourceFiles(file) {
    const { source, owner, name } = this.props.match.params;

    const { lines={ found: 0, hit: 0 }, branches={ found: 0, hit: 0 }, functions={ found: 0, hit: 0 } } = file;

    const lineCoverage = parseInt((lines.hit / lines.found) * 100);
    const fileName = encodeURIComponent(file.title).replace(/\./g, '%2E');

    let colorIndex = Math.floor((lines.hit / lines.found) * coverageGradient.length);
    if (!colorIndex) colorIndex = 1;
    const badgeColor = coverageGradient[coverageGradient.length - colorIndex];
    return {
      "File": <a href={`/coverage/${source.replace(/\./g, '%2E')}/${owner}/${name}/${fileName}`}>
          { file.file }
      </a>,
      "Coverage": <div><span className='badge-color' style={{backgroundColor: badgeColor}}></span>{lineCoverage}%</div>,
      "Lines": `${lines.hit} / ${lines.found}`,
      "Branches": `${branches.hit} / ${branches.found}`,
      "Functions": `${functions.hit} / ${functions.found}`
    };
  }
  render() {
    const { selectedBranch, project, error, loading } = this.state;

    if(loading) {
      return (<Loading/>);
    } else if(error) {
      return (<Error error={error} />);
    } else if(project) {
      const { source, owner, name } = this.props.match.params;

      const { _id, history } = project;
      const { message, commit, branch, git_branch, author_name, author_date } = history[0].git;

      const data = parseCoverage(history, selectedBranch);

      const options = history.map(function(history) {
        const { git } = history;
        return git.branch || git.git_branch;
      }, []).filter((a, i, array) => array.indexOf(a) == i && !!a).sort().map((b) => {
        return { value: b, label: b };
      });

      const commitUrl = `${_id.replace('.git', '')}/commit/${commit}`;

      return (<div className="coverage">
         <div className="coverage-header">
          <div style={{display: 'inline-block', width: '100%'}}>
            <div style={{float: 'left', textAlign: 'left'}}>
                <h3>
                  <a href={`/coverage/${source.replace(/\./g, '%2E')}/${owner}/`}>{owner}</a> / <a href={`/coverage/${source.replace(/\./g, '%2E')}/${owner}/${name}`}>{name}</a> <img src={`/badge/${source.replace(/\./g, '%2E')}/${owner}/${name}.svg`} style={{verticalAlign: 'middle'}} />
                </h3>
                <p>
                  <a className="coverage-commit-message" href={commitUrl} target="_blank" rel="noopener noreferrer"> {message} </a>
                  on branch
                  <b> {branch || git_branch} </b>
                  {Moment(author_date * 1000).fromNow()}
                  &nbsp;by
                  <b> {author_name} </b>
                </p>
            </div>
          </div>
          <div style={{margin: '0 auto 30px'}}>
            <Select
              matchPos="any"
              value={selectedBranch}
              options={options}
              onChange={this.onChangeBranch.bind(this)}
            />
          </div>
          <CoverageChart width={window.innerWidth > 1080 ? 1080 : window.innerWidth} data={data} height={100} />
          <h4> Source Files ({ history[0].source_files.length })</h4>
          <Table data={history[0].source_files.map(this.reduceSourceFiles.bind(this))} chunk={100}/>
          <h4> Recent Builds ({ history.length })</h4>
          <Table data={history.map(this.reduceBuilds)} chunk={9}/>
         </div>
      </div>);
    } else {
      return (<div className="text-center" style={{width:"100%",position: "absolute",top: "50%",transform: "translateY(-50%)"}}>
        No Coverage 🌧
      </div>);
    }
  }
}

Coverage.propTypes = {
  match: PropTypes.object
};

export default Coverage;

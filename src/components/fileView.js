import './fileView.css';
import 'highlight.js/styles/solarized-light.css';

import React from 'react';
import PropTypes, { func } from 'prop-types';
import Highlight from 'highlight.js';
import Parser from 'html-react-parser';

function coverageStatus(line) {
  if (typeof line === 'undefined' || isNaN(line.hit)) return '';
  if (!line.hit) return 'uncovered';
  if (line.branchesFound != line.branchesHit) return 'partial';
  return 'covered';
}

function countHits(line) {
  if (typeof line === 'undefined' || isNaN(line.hit)) return '';
  return `${line.hit}×`;
}

class FileView extends React.Component {
  render() {
    const { source, lineMap, extension } = this.props;
    const lines = source.split('\n');

    return (<div className='file-view' style={{ paddingTop: '0', paddingBottom: '0', backgroundColor: '#fdf6e3', fontSize: "13px" }}>
      <div className="cov-layer">
        {lines
          .map((l, i) => lineMap[i])
          .map(line => (<span className={`times ${coverageStatus(line)}`}>{countHits(line)}</span>))}
      </div>
      <div className="src-layer">
        <div className="line-numbers">
          {lines.map((l, i) => (<a id={`L${i}`} className="line-number" href={`#L${i}`}>{i}</a>))}
        </div>
        <div className="source-code">
          <pre style={{margin: '0', padding: '0'}}>
            <code style={{margin: '0', padding: '0', fontFamily: 'monospace'}}>
            {Parser(Highlight.highlight(extension, source).value)}
            </code>
          </pre>
        </div>
      </div>
    </div>);
  }
}

FileView.propTypes = {
  source: PropTypes.string,
  lineMap: PropTypes.array,
  extension: PropTypes.string
};

export default FileView;

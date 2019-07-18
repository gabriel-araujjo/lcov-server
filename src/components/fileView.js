import './fileView.css';
import 'highlight.js/styles/default.css';

import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'highlight.js';
import Parser from 'html-react-parser';

class FileView extends React.Component {
  render() {
    const { source, lineMap, extension } = this.props;

    return (<div className='file-view' style={{ paddingTop: '0', paddingBottom: '0', backgroundColor: 'rgba(255, 245, 211, 0.5)', fontSize: "13px" }}>
      <div className="cov-layer">
        {source.split('\n').map((l, i) => {
          const covClass = !isNaN(lineMap[i]) ? lineMap[i] == 0 ? 'uncovered' : 'covered' : '';
          const count = !isNaN(lineMap[i]) ? `${lineMap[i]}×` : '';
          return (<span className={`times ${covClass}`}>{count}</span>)
        }, [])}
      </div>
      <div className="src-layer">
        <div className="line-numbers">
          {source.split('\n').map((l, i) => {
            return (<a id={`L${i}`} className="line-number" href={`#L${i}`}>{i}</a>)
          }, [])}
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

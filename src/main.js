import React from 'react';
import CoverageChart from './components/coverageChart';

import { name, description } from '../package.json';

class Main extends React.Component {
  render() {
    const { origin } = window.location;
    const data = [
      Array.from({length: 6}, () => Math.floor(Math.random() * (3000 - 1 + 1)) + 1)
    ];

    data[1] = data[0].map(v => Math.floor(Math.random() * (v - 1 + 1)) + 1)

    return (
      <div className="text-center" style={{width:"100%",position: "absolute",top: "50%",transform: "translateY(-50%)"}}>
        <h3 className="text-black">{name}</h3>
        <p className="text-black">{description}</p>
        <small className="text-black">
          <pre style={{display: "inline-block"}}>npm install -g lcov-server</pre>
          <br/>
          <pre style={{display: "inline-block"}}>cat coverage.info | lcov-server --upload {origin} --basePath $(pwd)</pre>
        </small>
        <div style={{display:'block', margin: '100px auto'}}>
            <CoverageChart height={50} width={window.innerWidth / 1.5} data={data} />
        </div>
      </div>
    );
  }
}

export default Main;

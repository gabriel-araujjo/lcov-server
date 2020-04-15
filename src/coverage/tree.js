import React from 'react';

import Breadcrumb from '../components/breadcrumb';
import SunburstChart from '../components/sunburst'
import {getReport} from '../lib/covera';

// import {parseCoverage} from '../lib/util.js';

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: '', loading: true};
  }

  async componentDidMount() {
    let {rep, com, dir} = this.props.match.params;

    if (!com) com = 'master';
    try {
      const tree = await getReport(rep, com);
      this.setState({
        tree,
        loading: false
      });
    } catch (ex) {
        console.error(ex);
      this.setState({error: ex.toString(), loading: false});
    }
  }

  render() {
    const {tree, error, loading} = this.state;
    const {rep, com, dir} = this.props.match.params;

    const fakeTree = [
      ['print/print.cc', 50, 20],
      ['print/special_print.cc', 50, 45],
      ['util/string.cc', 500, 500],
      ['util/http.cc', 200, 120],
      ['exec/main.cc', 100, 0],
      ['src/crypto/rsa.cc', 100, 70],
      ['src/crypto/detail/base64.cc', 30, 20]
    ];

    let content = loading ? 'Loading...' : (<SunburstChart report={fakeTree} />);

    return (<React.Fragment>
        <section className='col-2'>
          <h3 className='file breadcrumb'>
            <Breadcrumb rep={rep} com={com} dir={dir} />
          </h3>
          <h1>Tree</h1>
          {content}
        </section>
        <div class='col-3 charts'></div>
      </React.Fragment>);
  }

}

export default Tree;

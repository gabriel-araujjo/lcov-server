import React from 'react';
import PropTypes from 'prop-types';

import LineChart from '../lib/chart/line';

class CoverageChart extends React.Component {
  render() {
    const { data, height, width } = this.props;

    const opt = {
        data,
        colors: ['#eeeeee',   '#00ff8f'],
        labels: ['All lines', 'Covered'],
        width,
        height,
        lines: true,
        area: true,
        dots: false,
        hideLabels: true,
        grid: false
    };

    return (
      <LineChart {...opt} />
    );
  }
}

CoverageChart.propTypes = {
  data: PropTypes.array,
  height: PropTypes.number,
  width: PropTypes.number
};

export default CoverageChart;

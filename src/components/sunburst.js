import React from 'react';
import * as d3 from "d3";

function* intoArray(tree) {
  for (const v of tree.values()) {
    v[3] = [...intoArray(v[3]) ];
    yield v;
  }
};

function makeTree(files) {
  const tree = new Map;
  for (const [name, total, hits] of files) {
    let entry = tree;
    for (const part of name.split('/')) {
      if (!entry.has(part)) {
        entry.set(part, [ part, 0, 0, new Map ]);
      }
      entry = entry.get(part)
      entry[1] += total;
      entry[2] += hits;
      entry = entry[3];
    }
  }
  return [...intoArray(tree) ];
}

class SunburstChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.tree = makeTree(this.props.report);
  }

  componentDidMount() {
    let svg = d3.select(this.chartRef.current)
      .append('svg')
        .attr('width', 500)
        .attr('height', 500)
      .append('g')
        .attr('transform', 'translate(250, 250)');
    
    const coverageClass = level => d => {
      let percent = Math.floor((d.data[2] / d.data[1]) * 10) * 10;
      if (level >= 3) percent = 'NaN';
      return `white-stroke p-cov-${percent} lev-${level}`;
    };

    const pie = d3.pie().value(d => d[1]);
    function drawGraph(data,
        level = 1,
        startAngle = 0,
        endAngle = 2 * Math.PI,
        innerRadius = 40,
        outerRadius = innerRadius + 50) {

      if (level >= 3 && data.length) {
        data = [['', 1, 1, []]];
        innerRadius += 5;
        outerRadius = innerRadius + 5;
      }

      const dataReady = pie(data);
      const ratio = (endAngle - startAngle) / 2 / Math.PI;
      const arcPath = d3.arc()
        .startAngle(d => d.startAngle * ratio + startAngle)
        .endAngle(d => d.endAngle * ratio + startAngle)
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      svg.selectAll(`whatever`)
        .data(dataReady)
        .enter()
        .append('path')
        .attr('d', arcPath)
        .attr('class', coverageClass(level));

      const cInnerRadius = outerRadius;
      const cOuterRadius = outerRadius + (outerRadius - innerRadius) / 1.61803398875;
      for (const d of dataReady) {
        drawGraph(
          d.data[3],
          level + 1,
          d.startAngle * ratio + startAngle,
          d.endAngle * ratio + startAngle,
          cInnerRadius,
          cOuterRadius
        );
      }
    } 

    drawGraph(this.tree);
  }

  render() {
    return <div className="cov-chart" ref={this.chartRef}/>;
  }
}

export default SunburstChart;

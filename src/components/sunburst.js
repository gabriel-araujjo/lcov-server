import * as d3 from "d3";
import React from 'react';
import { interpolate } from "d3";

function* intoArray(tree, parent) {
  for (const v of tree.values()) {
    v[3] = [...intoArray(v[3], v) ];
    v[4] = parent;
    yield v;
  }
};

function makeTree(files) {
  const tree = new Map;
  const root = [ null, 0, 0, , 0 ];
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
  root[3] = [...intoArray(tree, root) ];
  return root;
}

class SunburstChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.tree = makeTree(this.props.report);
  }

  componentDidMount() {
    const svg = d3.select(this.chartRef.current)
                    .append('svg')
                    .attr('width', 500)
                    .attr('height', 500)
                    .append('g')
                    .attr('transform', 'translate(250, 250)');

    const duration = 600; /* ms */
    let tree = this.tree;
    const children = node => node[3];
    const parent = node => node[4];

    const coverageClass = (level, index) => d => {
      let percent = Math.floor((d.data[2] / d.data[1]) * 10) * 10;
      if (level >= 3)
        percent = 'NaN';
      return `white-stroke p-cov-${percent} lev-${level} g-${index.join('-')}`;
    };

    const pie = (innerRadius, outerRadius, startAngle, endAngle) => data => {
      const pie = d3.pie().sort(null).value(d => d[1])(data);
      const ratio = (endAngle - startAngle) / 2 / Math.PI;
      for (const d of pie) {
        d.startAngle = d.startAngle * ratio + startAngle;
        d.endAngle = d.endAngle * ratio + startAngle;
        d.innerRadius = innerRadius;
        d.outerRadius = outerRadius;
      }
      return pie;
    };

    function removeOthers(tree, keep, index = [0]) {
      const group = `.g-${index.join('-')}`;
      if (group == keep) return;
      const data = children(tree);
      svg.selectAll(group).data(data).remove();
      for (const [i, child] of data.entries()) {
        removeOthers(child, keep, [...index, i]);
      }
    }

    function drawGraph(data, level = 1, index = [0], startAngle = 0,
                       endAngle = 2 * Math.PI, innerRadius = 40,
                       outerRadius = innerRadius + 50,
                       delay = 0,
                       parentEntering = false) {

      const lastLevel = level >= 3 && data.length;
      if (lastLevel) {
        innerRadius += 5;
        outerRadius = innerRadius + 5;
      }

      const dataReady = pie(innerRadius, outerRadius, startAngle, endAngle)(data);

      const enteringArcPath = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(innerRadius + 1);

      let arcs = svg.selectAll(`.g-${index.join('-')}`);
      const entering = !arcs.size();
      if (entering) {
        arcs = arcs.data(dataReady);
      }

      console.log(`.g-${index.join('-')} (size ${arcs.size()})`);

      const arcTween = (d, i) => {
        const iInnerRadius = interpolate(d.innerRadius, innerRadius);
        const iOuterRadius = interpolate(d.outerRadius, outerRadius);
        const iStartAngle = interpolate(d.startAngle, dataReady[i].startAngle);
        const iEndAngle = interpolate(d.endAngle, dataReady[i].endAngle);
        return t => {
          d.innerRadius = iInnerRadius(t);
          d.outerRadius = iOuterRadius(t);
          d.startAngle = iStartAngle(t);
          d.endAngle = iEndAngle(t);
          return d3.arc()(d);
        }
      }

      if (parentEntering || !parentEntering && entering)
        delay += duration / 3;

      setTimeout(() => {
        arcs
          .attr('class', coverageClass(level, index))
          .transition()
            .duration(duration / 3)
            .attrTween('d', arcTween);

        arcs.enter()
            .append('path')
            .attr('class', coverageClass(level, index))
            .on('click',
                ({data : node}, nodeIndex, generation) => {
                  if (!children(node).length) return;
                  const newIndex = [...index, nodeIndex]
                  removeOthers(tree, `.g-${newIndex.join('-')}`)
                  tree = node;
                  drawGraph(children(tree), 1, newIndex);
                  drawCenter();
                })
            .attr('d', enteringArcPath)
            .transition()
                .duration(duration / 3)
                .attr('d', d3.arc());
      }, delay);

      if (lastLevel) return;
      const cInnerRadius = outerRadius;
      const cOuterRadius =
          outerRadius + (outerRadius - innerRadius) / 1.61803398875;
      for (const [i, d] of dataReady.entries()) {
        drawGraph(d.data[3], level + 1, [...index, i],
                  d.startAngle,
                  d.endAngle, cInnerRadius, cOuterRadius, delay, entering);
      }
    }

    function drawCenter() {
      const circle = (n, radio) => {
        const step = Math.PI * 2 / (n + 1);
        const points = [];
        let cursor = 0;
        for (;n; --n, cursor += step) {
          points.push([-Math.sin(cursor) * radio, -Math.cos(cursor) * radio]);
        }
        return `M${points.join(' ')}Z`;
      };
      const drawPath = d => {
        console.log(d);
        return d
          ? "M0,-28.294 -3.536,-24.757 -7.073,-21.220 -10.61,-17.684 -14.147,-14.147 -17.684,-10.610 -21.22,-7.074 -24.757,-3.537 -28.294,0 -24.757,3.536 -21.22,7.073 -17.684,10.610 -14.147,14.147 -10.61,17.684 -7.073,21.220 -3.536,24.757 0,28.294 3.694,24.600 7.388,20.906 3.468,16.985 -.453,13.065 -4.373,9.144 -8.294,5.224 .853,5.224 10,5.224 19.147,5.224 28.294,5.224 28.294,0 28.294,-5.224 19.147,-5.224 10,-5.224 .853,-5.224 -8.294,-5.224 -4.373,-9.150 -.453,-13.065 3.467,-16.986 7.388,-20.906 3.694,-24.600Z"
          : circle(38, 25);
      };

      const path = svg.selectAll(`.back`).data([ parent(tree) ]);
      path.transition().duration(duration).attr('d', drawPath);

      path.enter().append('path').attr('class', 'back').attr('d', drawPath);
    }

    drawGraph(children(tree));
    drawCenter();
  }

  render() {
    return < div className = "cov-chart" ref = {
      this.chartRef
    } />;
  }
}

export default SunburstChart;

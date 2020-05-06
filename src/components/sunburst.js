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
      console.log('Removing ' + group)
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
                       parentEntering = false,
                       reverseEntering = false) {

      const lastLevel = level >= 3 && data.length;
      if (lastLevel) {
        innerRadius += 5;
        outerRadius = innerRadius + 5;
      }

      const dataReady = pie(innerRadius, outerRadius, startAngle, endAngle)(data);

      const enteringArcPath = reverseEntering
        ? d3.arc()
          .innerRadius(outerRadius - 1)
          .outerRadius(outerRadius)
        : d3.arc()
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
                  const newIndex = [...index, nodeIndex];
                  removeOthers(tree, `.g-${newIndex.join('-')}`, _index);
                  tree = node;
                  drawGraph(children(tree), 1, newIndex);
                  drawCenter(newIndex);
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

    let _index;
    const centerButton = svg.append('g').attr('class', 'center-btn');
    centerButton.append('circle').attr('r', 40).style('fill', 'transparent');

    centerButton.on('click', () => {
      if (!parent(tree)) return;
      const newIndex = _index.slice(0, _index.length - 1);
      svg.selectAll('.p-cov-NaN').remove();
      const p = parent(tree);
      let offset = 0;
      let total = 0;
      let found = false;

      for (const node of children(p)) {
        total += node[1];
        if (node == tree) found = true;
        if (!found) offset = total;
      }

      const startAngle = offset * 2 * Math.PI / total;
      const endAngle = (offset + tree[1]) * 2 * Math.PI / total;

      // data, level = 1, index = [0], startAngle = 0,
      // endAngle = 2 * Math.PI, innerRadius = 40,
      // outerRadius = innerRadius + 50,
      // delay = 0,
      // parentEntering = false
      // reverseEntering = true
      const cOuterRadius = 90 + (90 - 40) / 1.61803398875;
      drawGraph(children(tree), 2, _index, startAngle, endAngle, 90, cOuterRadius);
      tree = parent(tree);
      drawGraph(children(tree), 1, newIndex, 0, 2 * Math.PI, 40, 90, duration / 6, false, true);
      drawCenter(newIndex);
    })

    function drawCenter(index = [0]) {
      _index = index;
      const circle = (n, radio) => {
        const step = Math.PI * 2 / (n + 1);
        const points = [];
        let cursor = 0;
        for (;n; --n, cursor += step) {
          points.push([-Math.sin(cursor) * radio, -Math.cos(cursor) * radio]);
        }
        return `M${points.join(' ')}Z`;
      };
      const width=10;
      const drawPath = (d) => {
        const arrow = [
          [0, -28.3], [-3.5, -24.8], [-7.1, -21.2], [-10.6, -17.7],
          [-14.1, -14.1], [-17.7, -10.6], [-21.2, -7.1], [-24.8, -3.5],
          [-28.3, 0], [-24.8, 3.5], [-21.2, 7.1], [-17.7, 10.6], [-14.1, 14.1],
          [-10.6, 17.7], [-7.1, 21.2], [-3.5, 24.8], [0, 28.3], [3.7, 24.6],
          [7.4, 20.9], [3.5, 17], [-.5, 13.1], [-4.4, 9.1], [-8.3, 5.2],
          [.9, 5.2], [10.0, 5.2], [19.1, 5.2], [28.3, 5.2], [28.3, 0],
          [28.3, -5.2], [19.1, -5.2], [10, -5.2], [.9, -5.2], [-8.3, -5.2],
          [-4.4, -9.2], [-.5, -13.1], [3.5, -17], [7.4, -20.9], [3.7, -24.6]
        ].map(p => p.map(i => i * width / 25));


        return parent(d)
          ? `M${arrow.join(' ')}Z`
          : circle(arrow.length, width);
      };

      const path = centerButton.selectAll(`.back`).data([tree]);
      path.transition().duration(duration).attr('d', drawPath);

      path.enter()
        .append('path')
        .attr('class', 'back')
        .attr('d', drawPath);
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

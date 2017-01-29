import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, color, text, boolean, number, array } from '@kadira/storybook-addon-knobs';

import { LineChart, PieChart } from '../src/lib/chart';

const opt = {
  data: [[97,92,89,30,72],[43,62,84,98,3],[23,88,52,14,4],[76,9,1,67,84]],
  axis: ['October', 'November', 'December', 'January', 'February', 'Marsh'],
  width: 400,
  height: 400,
  colors: ['#7B43A1', '#F2317A', '#FF9824', '#58CF6C'],
  labels: ['Cats', 'Dogs', 'Ducks', 'Cows']
};

const handleChange = function(e) {
  opt[e.target.name] = e.target.value;

}

const lineChart = storiesOf('LineChart', module);
lineChart.addDecorator(withKnobs);

lineChart
  .add('with area', () => (
    <LineChart {...opt} area={ true } lines = { false } />
  ))
  .add('with lines', () => (
    <LineChart {...opt} dots={ true } lines={ true } />
  ))
  .add('with tooltips', () => (
    <LineChart {...opt} width={ 600 } height={ 50 } stroke={ 2 } radius={ 6 } dots={ true } grid={ false } hideLabels={ true } />
  ))
  .add('with custom options', () => {
    const axis = array('axis', opt.axis);
    const width = number('width', 400);
    const height = number('height', 400);
    const dots = boolean('dots', true);
    const colors = array('colors', ['#7B43A1', '#F2317A', '#FF9824', '#58CF6C']);
    const labels = array('label', ['Cats', 'Dogs', 'Ducks', 'Cows']);
    const hideLabels = boolean('hideLabels', false);
    const maxValue = number('maxValue', 0);
    const heightRatio = number('heightRatio', 1);
    const padding = number('padding', 0);
    const grid = boolean('grid', true);
    const stroke = number('stroke', 1);
    const radius = number('radius', 3);

    return (<LineChart
        data={opt.data}
        dots={dots}
        axis={axis}
        width={width}
        height={height}
        colors={colors}
        labels={labels}
        hideLabels={hideLabels}
        maxValue={maxValue}
        heightRatio={heightRatio}
        padding={padding}
        grid={grid}
        stroke={stroke}
        radius={radius}
    />);
});

const pieChart = storiesOf('PieChart', module);
pieChart.addDecorator(withKnobs);
pieChart
    .add('with basic options', () => {
        return (<PieChart
            data={ [5, 12, 8, 3, 10] }
            radius={ 150 }
            hole={ 50 }
            colors={ ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C'] }
            labels={ true }
            percent={ true }
            strokeWidth={ 3 }
            stroke={ '#fff' }
        />)
    })
    .add('with custom options', () => {
        let data = array('data', [5, 12, 8, 3, 10]);
        const radius = number('radius', 150)
        const hole = number('hole', 50);
        const colors = array('colors', ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']);
        const labels = boolean('labels', true);
        const percent = boolean('percent', true);
        const strokeWidth = number('strokeWidth', 3);
        const stroke = color('stroke', '#fff');

        data = data.map((d) => {
            return parseInt(d);
        });
        
        return (<PieChart
            data={ data }
            radius={ radius }
            hole={ hole }
            colors={ colors }
            labels={ labels }
            percent={ percent }
            strokeWidth={ strokeWidth }
            stroke={ stroke }
        />)
    })

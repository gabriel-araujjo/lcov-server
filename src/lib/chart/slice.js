import React from 'react';

var Slice = React.createClass({
	getInitialState: function () {
		return {
			path: '',
			x: 0,
			y: 0
		};
	},
	getAnglePoint(startAngle, endAngle, radius, x, y) {
    	var x1, y1, x2, y2;

    	x1 = x + radius * Math.cos(Math.PI * startAngle / 180);
    	y1 = y + radius * Math.sin(Math.PI * startAngle / 180);
    	x2 = x + radius * Math.cos(Math.PI * endAngle / 180);
    	y2 = y + radius * Math.sin(Math.PI * endAngle / 180);

    	return { x1, y1, x2, y2 };
    },
	componentWillReceiveProps: function () {
		this.setState({ path: '' });
		this.draw();
	},
	componentDidMount: function () {
		this.draw();
	},
	draw() {
		const { radius, hole, angle, showLabel, startAngle, trueHole } = this.props;

		let path = [];
		let left, right, top = {};

		// Get angle points
		left = this.getAnglePoint(startAngle, startAngle + angle, radius, radius, radius);
		right = this.getAnglePoint(startAngle, startAngle + angle, radius - hole, radius, radius);

		path.push('M' + left.x1 + ',' + left.y1);
		path.push('A'+ radius +','+ radius + ' 0 ' + (angle > 180 ? 1 : 0) + ',1 ' + left.x2 + ',' + left.y2);
		path.push('L' + right.x2 + ',' + right.y2);
		path.push('A'+ (radius - hole) + ',' + (radius - hole) + ' 0 ' + (angle > 180 ? 1 : 0) + ',0 ' + right.x1 + ',' + right.y1);

		// Close
		path.push('Z');

		this.setState({ path: path.join(' ') });

		if (showLabel) {
			top = this.getAnglePoint(startAngle, startAngle + (angle / 2), (radius / 2 + trueHole / 2), radius, radius);

			this.setState({
				x: top.x2,
				y: top.y2
			});
		}
	},
    mouseEnter() {
		this.props.showTooltip([this.state.x, this.state.y, this.props.value, this.props.percent ? this.props.percentValue + '%' : this.props.value, this.props.fill])
	},
	mouseLeave() {
		this.props.hideTooltip();
	},
	render: function () {
		const { path, x, y } = this.state;
		const { fill, stroke, strokeWidth, showLabel, percent, percentValue, value } = this.props;
		return (
			<g overflow="hidden">
				<path
					d={ path }
					fill={ fill }
					stroke={ stroke }
					strokeWidth={ strokeWidth }
                    onMouseEnter={ this.mouseEnter }
                    onMouseLeave={ this.mouseLeave }
					 />
    				{ showLabel && percentValue > 5 ?
    					<text x={ x } y={ y } fill="#fff" textAnchor="middle">
    						{ percent ? percentValue + '%' : value }
    					</text>
    				: null }
			</g>
		);
	}
});

Slice.propTypes = {
	fill: React.PropTypes.string,
	stoke: React.PropTypes.number,
	strokeWidth: React.PropTypes.number,
	showLabel: React.PropTypes.boolean,
	percent: React.PropTypes.boolean,
	percentValue: React.PropTypes.number,
	value: React.PropTypes.number
};

Slice.defaultProps = {
	fill: '#fff',
	stoke: 3,
	strokeWidth: 3,
	showLabel: true,
	percent: true,
	percentValue: 0,
	value: 0
};

module.exports = {
    Slice
};

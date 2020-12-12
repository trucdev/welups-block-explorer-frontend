
import React, { Component } from 'react';
import './summary.css';
import { connect } from 'react-redux';
import { loadSystemState } from '../../actions/home';

class SummaryBar extends Component {
	componentDidMount() {
		this.props.loadSystemState();
	}
	render() {
		return (
			<div className='summaryGroup'>
				<div className="summaryCard" >
					<div className="summaryCardTitle">Block Height</div>
					<div className="summaryCardValue">{this.props.systemState.block_height}</div>
				</div>
				<div className="summaryCard" >
					<div className="summaryCardTitle">Total Blocks</div>
					<div className="summaryCardValue">{this.props.systemState.block_num}</div>
				</div>
				<div className="summaryCard" >
					<div className="summaryCardTitle">Transaction Nums</div>
					<div className="summaryCardValue">{this.props.systemState.transaction_num}</div>
				</div>
				<div className="summaryCard" >
					<div className="summaryCardTitle">Total Nodes</div>
					<div className="summaryCardValue">{this.props.systemState.total_nodes}</div>
				</div>
			</div>
			);
	}
}
// export default SummaryBar;
const mapStateToProps = (state) => {
	return {
		systemState: state.system.systemState,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadSystemState: () => {
			dispatch(loadSystemState());
		},

	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SummaryBar);
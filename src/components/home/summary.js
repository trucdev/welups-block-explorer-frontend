
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadSystemState } from '../../actions/home';
import styled from 'styled-components';


//Styled components
const SummaryGroup = styled.div`
	display: flex;
	justify-content: space-evenly;
	border-radius: 5px;
	border: 1px solid #d9d9d9; 
`;
const SummaryCard = styled.div`
	border-radius: 5px;
	padding: 20px;
`;
const SummaryCardValue= styled.div`
	color: #c53027!important;
`;
const SummaryCardTitle = styled.div`
	color:#666!important;
	font-weight: bold!important;
	font-size: 13px;
`;



class SummaryBar extends Component {
	componentDidMount() {
		this.props.loadSystemState();
	}
	render() {
		return (
			<SummaryGroup>
				<SummaryCard>
					<SummaryCardTitle>Block Height</SummaryCardTitle>
					<SummaryCardValue>{this.props.systemState.block_height}</SummaryCardValue>
				</SummaryCard>
				<SummaryCard>
					<SummaryCardTitle>TRC10 Tokens</SummaryCardTitle>
					<SummaryCardValue>{this.props.systemState.asset_num}</SummaryCardValue>
				</SummaryCard>
				{/* <SummaryCard>
					<SummaryCardTitle>Transaction Nums</SummaryCardTitle>
					<SummaryCardValue>{this.props.systemState.transaction_num}</SummaryCardValue>
				</SummaryCard> */}
				<SummaryCard>
					<SummaryCardTitle>Total Nodes</SummaryCardTitle>
					<SummaryCardValue>{this.props.systemState.total_nodes}</SummaryCardValue>
				</SummaryCard>
			</SummaryGroup>
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
import React, {Component} from 'react';
import BlockList from './block';
import TransactionList from './transaction';
import Search from './search'
import Summary from './summary';
import { connect } from 'react-redux';
import styled from 'styled-components';

const MarginWrapper = styled.div`
	margin: 5px;
`;
const RecentMainFrameWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 5px;
`;
const RecentFrameWrapper = styled.div`
	width: 50%;
	& + & {
		margin-left: 5px;
	  }	
`;


class Home extends Component{
	render(){
		return (
			<div>
				<MarginWrapper><Search/></MarginWrapper>
				<MarginWrapper><Summary/></MarginWrapper>
				<RecentMainFrameWrapper>
					<RecentFrameWrapper> <BlockList></BlockList></RecentFrameWrapper>
					<RecentFrameWrapper> <TransactionList></TransactionList></RecentFrameWrapper>
				</RecentMainFrameWrapper>
			</div>
			
			
		);
	}
}

// export default Home;
const mapStateToProps = (state) => {
	return {
		
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(Home);
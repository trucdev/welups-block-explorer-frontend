import React, {Component} from 'react';
import BlockList from './block';
import TransactionList from './transaction';
import Search from './search'
import Summary from './summary';
import { connect } from 'react-redux';
import './home.css';
class Home extends Component{
	render(){
		return (
			<div>
				<div className='search-wrapper' ><Search/></div>
				<div className='summary-wrapper' ><Summary/></div>
				<div className='recent-items-wrapper' >
					<div className='recent-block' > <BlockList></BlockList></div>
					<div className='recent-trans' > <TransactionList></TransactionList></div>
				</div>
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
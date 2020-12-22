import React, {Component} from 'react';
import { connect } from 'react-redux';

class TransactionTotal extends Component{
	render(){
		let {transaction_num} = this.props;
		return (
			<div>
				<span>A Total of</span> {transaction_num} <span>Transactions</span>
			</div>					
		);
	}
}

const mapStateToProps = (state) => {
	return {
		transaction_num:state.block.transaction_num
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(TransactionTotal);
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Th} from './style';

class BlockTransaction extends Component{
	render(){
		let {transaction_num} = this.props;

		return (
			<TableRow>
				<Th>
					<span>Transaction</span>:
				</Th>
				<td>
					<div>
						<span>{transaction_num}&nbsp;Txns</span>
					</div>
				</td>
			</TableRow>				
		);
	}
}

const mapStateToProps = (state) => {
	return {
		transaction_num:state.block.transaction_num,
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockTransaction);
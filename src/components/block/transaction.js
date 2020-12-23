import React, {Component} from 'react';
import { connect } from 'react-redux';
import TransactionTotal from './transactionTotal';
import TransactionRow from './transactionRow';
import {TableRow, Table, Div} from './style';

class Transaction extends Component{
	render(){
		let {transactionList} = this.props;
		let _transactionList = transactionList.map((transac,index)=>{
			return <TransactionRow key={index} transac={transac}/>;
		});
		return (
			<div>
			    <Div>
			    	<TransactionTotal/>
			    </Div>
				<Table>
					<tbody>
						<TableRow>
							<th>Hash</th>
							<th>Status</th>
							<th>Age</th>
							<th>Contract Type</th>
						</TableRow>
						{_transactionList}
					</tbody>
				</Table>
			</div>			
		);
	}
}

const mapStateToProps = (state) => {
	return {
		transactionList:state.blockTransaction,
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(Transaction);
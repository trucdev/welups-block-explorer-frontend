import React, {Component} from 'react';
import { connect } from 'react-redux';
import TransactionTotal from './transactionTotal';
import TransactionTable from './transactionTable';
import {Div} from './style';

class Transaction extends Component{
	render(){
		return (
			<div>
			    <Div>
			    	<TransactionTotal/>
			    </Div>
				<TransactionTable/>
			</div>			
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(Transaction);
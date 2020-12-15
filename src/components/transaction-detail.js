import React, {Component} from 'react';
import { connect } from 'react-redux';

class TransactionDetail extends Component{
	render(){
		return (
			<div>TransactionDetail</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(TransactionDetail);
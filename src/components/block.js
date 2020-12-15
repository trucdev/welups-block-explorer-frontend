import React, {Component} from 'react';
import { connect } from 'react-redux';

class BlockDetail extends Component{
	render(){
		return (
			<div>BlockDetail</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockDetail);
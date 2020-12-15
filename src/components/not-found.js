import React, {Component} from 'react';
import { connect } from 'react-redux';

class NotFound extends Component{
	render(){
		return (
			<div>NotFound</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(NotFound);
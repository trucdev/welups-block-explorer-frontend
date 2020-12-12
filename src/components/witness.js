import React, {Component} from 'react';
import { connect } from 'react-redux';

class Witness extends Component{
	render(){
		return (
			<div>Witness</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(Witness);
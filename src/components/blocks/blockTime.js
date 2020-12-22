import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Th} from './style';

class BlockTime extends Component{
	render(){
		let {time} = this.props;

		return (
			<TableRow>
				<Th>
					<span>Time</span>:
				</Th>
				<td>
					<div>
						<span>{time}(Local)</span>
					</div>
				</td>
			</TableRow>				
		);
	}
}

const mapStateToProps = (state) => {
	return {
		time:state.block.time,
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockTime);
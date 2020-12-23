import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Th} from './style';

class BlockHeight extends Component{
	render(){
		let {block_num} = this.props;

		return (
			<TableRow>
				<Th>
					<span>Height</span>:
				</Th>
				<td>
					<div>
						<span>{block_num}</span>
					</div>
				</td>
			</TableRow>				
		);
	}
}

const mapStateToProps = (state) => {
	return {
		block_num:state.block.block_num,
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockHeight);
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Flex, QuestionMark, BadgeGreen, BadgeRed, Th, contentStatus} from './style';
import {Popover } from 'antd';

class BlockStatus extends Component{
	render(){
		var {confirm} = this.props;

		return (
			<TableRow>
				<Th>
					 
					<Flex>
						Status&nbsp;
						<Popover content={contentStatus} title="">
							<QuestionMark>?</QuestionMark>
						</Popover>
						:
					</Flex>
				</Th>
				<td>
					{confirm==="confirmed"?<BadgeGreen count="CONFIRMED"/>:<BadgeRed count="UNCOMFIRMED"/>}
				</td>
			</TableRow>				
		);
	}
}

const mapStateToProps = (state) => {
	return {
		block_num:state.block.block_num,
		block_height:state.block.block_height,
		confirm:state.block.confirm
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockStatus);
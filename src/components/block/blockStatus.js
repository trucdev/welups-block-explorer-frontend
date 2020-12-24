import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Flex, QuestionMark, StatusTag, BadgeGreen, BadgeRed, Th, contentStatus} from './style';
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
					{confirm>=19?<BadgeGreen count="CONFIRMED"/>:<BadgeRed count="UNCOMFIRMED"/>}
					<StatusTag>{confirm>=200?"Confirmed by over 200 blocks":"Confirmed by "+confirm+" blocks"}</StatusTag>
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
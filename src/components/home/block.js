import React from 'react';
import { List } from 'antd';
import { BlockOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { loadRecentBlocks } from '../../actions/home';
import {
	Link  } from "react-router-dom";
import {RecentListTitleFrame,
	RecentListTitle,
	RecentListContentFrame,
	RecentItem,
	RecentItemTitle,
	RecentItemRow,
	RecentItemData,StyledLink,} from './recent-list';

class BlockList extends React.Component {
	componentDidMount() {
		this.props.loadRecentBlocks();
	}
	blockItem = (block) => {
		return <List.Item key={block.num}>
			<RecentItem>
				<RecentItemTitle>
					<span>Block:<RecentItemData><StyledLink to={`/block/${block.num}`}>{block.num}</StyledLink></RecentItemData></span>
					<span>Producer:<RecentItemData ><StyledLink to={`/account/${block.producer}`}>{block.producer}</StyledLink></RecentItemData></span>
				</RecentItemTitle>
				<RecentItemRow>
					<span>Include: <RecentItemData>{block.transactions}</RecentItemData> transactions</span>
				</RecentItemRow>
				<RecentItemRow>
					<span>Block reward:<RecentItemData>{16}</RecentItemData></span>
					<span>at: <RecentItemData>{new Date(block.timestamp).toString()}</RecentItemData></span>
				</RecentItemRow>
			</RecentItem>
		</List.Item>;
	}
	render() {
		let blocks = this.props.blocks;
		blocks.sort(function (a, b) { return b.num - a.num });
		return (
			<div>
				<RecentListTitleFrame>
					<BlockOutlined />
					<RecentListTitle>Recent Blocks</RecentListTitle>
				</RecentListTitleFrame>
				<RecentListContentFrame>
					<PerfectScrollbar>
						<List
							dataSource={blocks}
							renderItem={block => (
								this.blockItem(block)
							)}
						/>
					</PerfectScrollbar>
				</RecentListContentFrame>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		blocks: state.homeBlocks.blocks,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadRecentBlocks: () => {
			dispatch(loadRecentBlocks());
		},

	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BlockList);
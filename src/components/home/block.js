import React from 'react';
import { List } from 'antd';
import { BlockOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { loadRecentBlocks } from '../../actions/home';
import { Row, Col } from 'antd';
import {
	RecentListTitleFrame,
	RecentListTitle,
	RecentListContentFrame,
	RecentItem,
	RecentItemData, StyledLink,
	RecentRightCol,
} from './recent-list';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addLocale(en)

class BlockList extends React.Component {
	componentDidMount() {
		this.props.loadRecentBlocks();
	}
	blockItem = (block) => {
		return <List.Item key={block.num}>
			<RecentItem>
				<Row >
				<Col xs={24} sm={24} md={12}>
						<span>Block:<RecentItemData><StyledLink to={`/block/${block.num}`}>{block.num}</StyledLink></RecentItemData></span>
					</Col>
					<RecentRightCol xs={24}  sm={24} md={12} >
						<span>Producer:<RecentItemData ><StyledLink to={`/account/${block.producer}`}>{block.producer}</StyledLink></RecentItemData></span>
					</RecentRightCol>
				</Row>
				<Row >
					<Col span={24}>
						<span>Include: <RecentItemData>{block.transactions}</RecentItemData> transactions</span>
					</Col>
				</Row>
				<Row >
					<Col xs={24}  sm={24} md={12}>
						<span>Block reward:<RecentItemData>{16}</RecentItemData></span>
					</Col>
					<RecentRightCol xs={24}  sm={24} md={12}>
						<span><RecentItemData>{block.timestamp&&block.timestamp<Date.now()?<ReactTimeAgo date={block.timestamp} locale="en-US"/>:"unknown"}</RecentItemData></span>
					</RecentRightCol>
				</Row>
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
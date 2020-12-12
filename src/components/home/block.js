import React from 'react';
import { List } from 'antd';
import { BlockOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './block.css';
import { connect } from 'react-redux';
import { loadRecentBlocks } from '../../actions/home';
const BLOCKLIST_HEADER = 'Recent Blocks';
class BlockList extends React.Component {

	componentDidMount() {
		this.props.loadRecentBlocks();
	}
	blockItem = (block) => {
		return <List.Item key={block.num}>
			<div className="block">
				<div className="blockRow blockRowTitle">
					<span>Block:<span className="blockRowData">{block.num}</span></span>
					<span>Producer:<span className="blockRowData">{block.producer}</span></span>
				</div>
				<div className="blockRow">
					<span>Include: <span className="blockRowData">{block.transactions}</span> transactions</span>
				</div>
				<div className="blockRow">
					<span>Block reward:<span className="blockRowData">{16}</span></span>
					<span>at: <span className="blockRowData">{new Date(block.timestamp).toString()}</span></span>
				</div>
			</div>
		</List.Item>;
	}
	render() {
		let blocks = this.props.blocks;
		blocks.sort(function (a, b) { return b.num - a.num });
		return (
			<div>
				<div className='group'>
					<BlockOutlined />
					<span className='groupTitle'>{BLOCKLIST_HEADER}</span>
				</div>
				<div className='groupContent'>
					<PerfectScrollbar>
						<List
							dataSource={blocks}
							renderItem={block => (
								this.blockItem(block)
							)}
						/>
					</PerfectScrollbar>
				</div>
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
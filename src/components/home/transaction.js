import React from 'react';
import { List } from 'antd';
import { BlockOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { loadRecentTrans } from '../../actions/home';
import {RecentListTitleFrame,
	RecentListTitle,
	RecentListContentFrame,
	RecentItem,
	RecentItemTitle,
	RecentItemRow,
	RecentItemData,} from './recent-list';
class TransactionList extends React.Component {

	componentDidMount() {
		this.props.loadRecentTrans();
	}
	tranItem = (tran) => {
		return <List.Item key={tran.hash}>
			<RecentItem>
				<RecentItemTitle>
					<span>Transaction:<RecentItemData>{tran.hash.substring(0, 16) + "..." }</RecentItemData></span>
				</RecentItemTitle>
				<RecentItemRow>
					<br></br>
				</RecentItemRow>
				<RecentItemRow>
					<span>Type:<RecentItemData>{tran.type}</RecentItemData></span>
					<span>at: <RecentItemData>{new Date(tran.timestamp).toString()}</RecentItemData></span>
				</RecentItemRow>
			</RecentItem>
		</List.Item>;
	}
	render() {
		let trans = this.props.trans;
		trans.sort(function (a, b) { return b.timestamp - a.timestamp });
		return (
			<div>
				<RecentListTitleFrame>
					<BlockOutlined />
					<RecentListTitle>Recent Transactions</RecentListTitle>
				</RecentListTitleFrame>
				<RecentListContentFrame>
					<PerfectScrollbar>
						<List
							dataSource={trans}
							renderItem={tran => (
								this.tranItem(tran)
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
		trans: state.homeTrans.trans,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadRecentTrans: () => {
			dispatch(loadRecentTrans());
		},

	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TransactionList);
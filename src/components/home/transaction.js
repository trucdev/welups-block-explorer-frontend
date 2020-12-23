import React from 'react';
import { List } from 'antd';
import { BlockOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { loadRecentTrans } from '../../actions/home';
import { Row, Col } from 'antd';
import {
	RecentListTitleFrame,
	RecentListTitle,
	RecentListContentFrame,
	RecentItem,
	RecentItemData, StyledLink,
	RecentRightCol,
} from './recent-list';

class TransactionList extends React.Component {

	componentDidMount() {
		this.props.loadRecentTrans();
	}
	tranItem = (tran) => {
		return <List.Item key={tran.hash}>
			<RecentItem>
				<Row >
					<Col xs={24} sm={24} md={12} >
						<span>Transaction:<RecentItemData>
							<StyledLink to={`/transaction/${tran.hash}`}>{tran.hash.substring(0, 24) + "..."}</StyledLink>
						</RecentItemData></span>
					</Col>
				</Row>
				<Row >
					<Col xs={0} sm={0} md={24}>
						<br></br>
					</Col>
				</Row>

				<Row >
					<Col xs={24} sm={24} md={12}>
						<span>Type:<RecentItemData>{tran.type}</RecentItemData></span>
					</Col>
					<RecentRightCol xs={24} sm={24} md={12} >
						<span>at: <RecentItemData>{new Date(tran.timestamp).toLocaleString()}</RecentItemData></span>
					</RecentRightCol>
				</Row>
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
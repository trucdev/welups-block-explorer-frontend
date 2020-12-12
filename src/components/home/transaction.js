import React from 'react';
import { List } from 'antd';
import { BlockOutlined } from '@ant-design/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './transaction.css';
import { connect } from 'react-redux';
import { loadRecentTrans } from '../../actions/home';
const BLOCKLIST_HEADER = 'Recent Transactions';
class TransactionList extends React.Component {

	componentDidMount() {
		this.props.loadRecentTrans();
	}
	tranItem = (tran) => {
		return <List.Item key={tran.hash}>
			<div className="tran">
				<div className="tran-row tran-row-title">
					<span>Transaction:<span className="tran-row-data">{tran.hash.substring(0, 16) + "..." }</span></span>
				</div>
				<div className="blockRow">
					<br></br>
				</div>
				<div className="blockRow">
					<span>Type:<span className="tran-row-data">{tran.type}</span></span>
					<span>at: <span className="tran-row-data">{new Date(tran.timestamp).toString()}</span></span>
				</div>
			</div>
		</List.Item>;
	}
	render() {
		let trans = this.props.trans;
		trans.sort(function (a, b) { return b.timestamp - a.timestamp });
		return (
			<div>
				<div className='tran-group'>
					<BlockOutlined />
					<span className='tran-group-title'>{BLOCKLIST_HEADER}</span>
				</div>
				<div className='tran-group-content'>
					<PerfectScrollbar>
						<List
							dataSource={trans}
							renderItem={tran => (
								this.tranItem(tran)
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
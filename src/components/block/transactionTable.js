import React, {Component} from 'react';
import { connect } from 'react-redux';
import {BadgeGreen, BadgeRed, StyledLink} from './style';
import { Table, Tag } from 'antd';
import {Link} from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const confirm = 19;

const columns = [
	{
		title: 'No.',
		key: 'no',
		render: (value, item, index) => (index + 1),
		fixed: 'left',
		width: 70,
	},
	{
		title: 'Hash',
		dataIndex: 'hash',
		key: 'hash',
		render: text => <StyledLink key={text} to={`/transaction/${text}`}>{text}</StyledLink>,
	},
	{
		title: 'Status',
		key: 'status',
		render: () => confirm>=19?<BadgeGreen count="CONFIRMED"/>:<BadgeRed count="UNCOMFIRMED"/>
	},
	{
		title: 'Age',
		key: 'age',
		render: record => <ReactTimeAgo date={record.timestamp?record.timestamp:0} locale="en-US"/>
	},
	{
		title: 'Contract Type',
		key: 'type',
		dataIndex: 'type',
	},
];

class TransactionTable extends React.Component {
	componentDidMount() {
	}
	render() {
		const {transactionList} = this.props;
		return (
			<Table columns={columns}
				dataSource={transactionList}
				rowKey="hash"
				scroll={{ x: 1300 }} sticky
			/>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		transactionList:state.blockTransaction,
	};
};
const mapDispatchToProps = dispatch => {
	return {
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TransactionTable);
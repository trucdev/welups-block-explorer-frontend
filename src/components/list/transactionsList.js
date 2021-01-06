import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadTransactions, updatePageTransactions, updatePageTransactionsLimit, } from '../../actions/transactions';
import { Table, Pagination } from 'antd';
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';

const Container = styled.div`
	margin: 5px;
`;
const Title = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	font-size: 20px;
	text-transform: uppercase;
`;
const RedText = styled.span`
	 color: #E50915;
`;
const PagiContainer = styled.div`
	margin-top: 15px;
	text-align: right;
`;

const columns = [
	{
		title: 'No.',
		key: 'num',
		width: '5%',
		render: (value, item, index) => (index + 1),
	},
	{
		title: 'Hash',
		dataIndex: 'hash',
		key: 'hash',
		width: '15%',
		render: text => 
		<Link to={"/transaction/"+text}>
		<RedText>{text.substring(0, 6) + "..." + text.substring(59, 65)}</RedText>
		</Link>
	},
	{
		title: 'Block',
		dataIndex: 'blockNumber',
		key: 'blockNumber',
		width: '15%',
		render: text => 
		<Link to={"/block/"+text}>
		<RedText>{text}</RedText>
		</Link>
	},
	{
		title: 'Age',	
		width: '15%',
		key: 'timestamp',
		render: record => {
			var time = record.timestamp&&record.timestamp<Date.now()?<ReactTimeAgo date={record.timestamp} locale="en-US"/>:"unknown";
			return time;
		  }
	},
	{
		title: 'Transaction type',
		dataIndex: 'type',
		width: '15%',
		key: 'type',
	},
	
];
class TransactionsList extends React.Component {
	componentDidMount() {
		const {pageTransactions} = this.props;
		this.props.loadTransactions(pageTransactions.start_item, pageTransactions.page_limit);
		
		
		
	}

	onChange=(pageNumber, pageLimit) =>{
	    this.props.updatePageTransactions(pageNumber);
	    var {pageTransactions} = this.props;
	    this.props.loadTransactions(pageTransactions.start_item, pageTransactions.page_limit);
	}
	render() {
		var {transactions, pageTransactions} = this.props;
		return (
			<Container>
				<Title>List of Transactions</Title>
				<div id="datetime"></div>
				<Table columns={columns}
					dataSource={transactions}
					rowKey="hash"
					pagination={false}
				/>
				<PagiContainer>
					<Pagination 
						current={pageTransactions.start_page} 
						total={pageTransactions.total_items} 
						onChange={this.onChange}
						showSizeChanger={false}
						showQuickJumper/>
				</PagiContainer>
			</Container>


		);
	};
};



const mapStateToProps = (state) => {

	return {
		transactions: state.transactions,
		pageTransactions:state.pageTransactions
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadTransactions: (offset, limit) => {
			dispatch(loadTransactions(offset, limit));
		},
		updatePageTransactions: (page) => {
			dispatch(updatePageTransactions(page));
		},
		updatePageTransactionsLimit: (limit) => {
			dispatch(updatePageTransactionsLimit(limit));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
	TransactionsList);
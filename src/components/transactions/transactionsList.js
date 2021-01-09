import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadTransactions, updatePageTransactions, updatePageTransactionsLimit, } from '../../actions/transactions';
import { Table, Pagination } from 'antd';
import { Link } from "react-router-dom";
import {toTimeAgo, decimalFormat, currencyFormat} from '../../utils/utils';

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
		width: '12%',
		render: text =>
			<Link to={"/transaction/" + text}>
				<RedText>{text.substring(0, 6) + "..." + text.substring(59, 65)}</RedText>
			</Link>
	},
	{
		title: 'Block',
		dataIndex: 'blockNumber',
		key: 'blockNumber',
		width: '10%',
		render: text =>
			<Link to={"/block/" + text}>
				<RedText>{text}</RedText>
			</Link>
	},
	{
		title: 'Transaction type',
		dataIndex: 'type',
		width: '15%',
		key: 'type',
	},
	{
		title: 'From',
		key: 'from',
		width: '12%',
		render: record =>{
			if (record.type === "TransferContract" || record.type === "TransferAssetContract"  ) {
				return  <Link to={"/account/" + record.contract.parameter.raw.OwnerAddress}><RedText>{record.contract.parameter.raw.OwnerAddress.substring(0, 6) + "..." + record.contract.parameter.raw.OwnerAddress.substring(28, 34)}</RedText></Link>
			}else{ 
				return <span>&nbsp; &nbsp; &nbsp; -</span>		
			}
		}	
	},
	{
		title: 'To',
		key: 'to',
		width: '12%',
		render: record =>{
			if (record.type === "TransferContract" || record.type === "TransferAssetContract"  ) {
				return <Link to={"/account/" + record.contract.parameter.raw.ToAddress}><RedText>{record.contract.parameter.raw.ToAddress.substring(0, 6) + "..." + record.contract.parameter.raw.ToAddress.substring(28, 34)}</RedText></Link>
			}else{ 
				return <span>&nbsp; &nbsp; &nbsp; -</span>		
			}
		}	
	},
	{
		title: 'Amount',
		width: '12%',
		key: 'amount',
		render: record =>{
			if (record.type === "TransferAssetContract"  ) {
				return <span>{currencyFormat(decimalFormat(record.contract.parameter.raw.Amount))}</span>
			}else if (record.type === "TransferContract" ) {
				return <span>{currencyFormat(decimalFormat(record.contract.parameter.raw.Amount/1000000))} ACG</span>
			}
			else{ 
				return <span>&nbsp; &nbsp; &nbsp; -</span>
			}
		}
		
	},
	{
		title: 'Asset',
		width: '10%',
		key: 'asset',
		render: record =>{
			if (record.type === "TransferAssetContract"  ) {
				return <RedText>{record.contract.parameter.raw.AssetName}</RedText>
			}else{ 
				return <span>&nbsp; &nbsp; &nbsp; -</span>		
			}
		}
	},
	{
		title: 'Age',
		width: '20%',
		key: 'timestamp',
		render: record => {
			var time = record.timestamp?toTimeAgo(record.timestamp) : "unknown";
			return time;
		}
	},

];
class TransactionsList extends React.Component {
	componentDidMount() {
		const { pageTransactions } = this.props;
		this.props.loadTransactions(pageTransactions.start_item, pageTransactions.page_limit);



	}

	onChange = (pageNumber, pageLimit) => {
		this.props.updatePageTransactions(pageNumber);
		var { pageTransactions } = this.props;
		this.props.loadTransactions(pageTransactions.start_item, pageTransactions.page_limit);
	}
	render() {
		var { transactions, pageTransactions } = this.props;
		return (
			<Container>
				<Title>List of Transactions</Title>
				<div id="datetime"></div>
				<Table columns={columns}
					dataSource={transactions}
					rowKey="hash"
					pagination={false}
					scroll={{ x: 1500 }} sticky
				/>
				<PagiContainer>
					<Pagination
						current={pageTransactions.start_page}
						total={pageTransactions.total_items}
						onChange={this.onChange}
						showSizeChanger={false}
						showQuickJumper />
				</PagiContainer>
			</Container>


		);
	};
};



const mapStateToProps = (state) => {

	return {
		transactions: state.transactions,
		pageTransactions: state.pageTransactions
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
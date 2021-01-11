import React from 'react';
import { Table, Pagination } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadTokens,  updatePageTokens, updatePageTokensLimit } from '../../actions/tokens';
import styled from 'styled-components';
import {currencyFormat} from '../../utils/utils';

const LeftHeader = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	font-size: 20px;
	text-transform: uppercase;
`;
const StyledLink = styled(Link)`
	&:link, &:visited {
		color: #c23631;
	}
`;
const Wrapper = styled.div`
	margin: 5px;
`;
const Pagin = styled.div`
	margin-top: 15px;
	text-align: right!important;
`;
// const Gray = styled.div`
// 	color: #999;
// 	font-size: 11px;
// `;
// const QuestionMark = styled.div`
// 	width: 1rem;
//     height: 1rem;
//     border-radius: 50%;
//     background-color: #d8d8d8;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//     margin-top: 3px;
// `;
// const Flex = styled.div`
// 	display: flex;
// `;
// const RedSpan = styled.span`
//     color:#c23631;  
// `;
// const GreenSpan = styled.span`
//     color:#69c265;  
// `;
// const Bt5 = styled.div`
//     margin-bottom:5px;  
// `;
// const HoverContent = styled.div`
//     width: 130px;
// `;
// const contentChange = (
//   <HoverContent>
//     <p>24H change compare with ACG</p>
//   </HoverContent>
// );
// const contentMarket = (
//   <HoverContent>
//     <p>Calculated by multiplying total circulating supply by current price of each token. Tokens with 24H trading volume lower than 10000 ACG are excluded.</p>
//   </HoverContent>
// );
// const columns = [
// 	{
// 		title: 'Rank',
// 		key: 'rank',
// 		render: (value, item, index) => (index + 1),
// 		fixed: 'left',
// 		width: 70,
// 	},
// 	{
// 		title: 'Token',
// 		key: 'token',
// 		render: record => <StyledLink key={record.address} to={`/contract/${record.address}`}>{record.name}</StyledLink>,
// 	},
// 	{
// 		title: 'Price',
// 		key: 'price',
// 		render: record => <div>
// 							<div>{record.price_USD.toFixed(6)}&nbsp;USD</div>
// 							<Gray>{record.price_TRX.toFixed(6)}&nbsp;ACG</Gray>
// 						</div>,
// 		defaultSortOrder: 'descend',
// 		sorter: (a, b) => a.price_USD-b.price_USD,
// 	},
// 	{
// 		title: <Flex>Change(%)&nbsp;
// 					<Popover content={contentChange} title="">
// 						<QuestionMark>?</QuestionMark>
// 					</Popover>
// 				</Flex>,
// 		key: 'change',
// 		render: (record) => {
// 			if(record.change>0){
// 				return <GreenSpan>{"+"+record.change+"%"}</GreenSpan>;
// 			}
// 			return <RedSpan>{record.change+"%"}</RedSpan>;
// 		}
// 	},
// 	{
// 		title: 'Volume (24H)',
// 		key: 'volume',
// 		render: record => <div>
// 							<div>{record.volume_USD.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}&nbsp;USD</div>
// 							<Gray>{record.volume_TRX.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}&nbsp;ACG</Gray>
// 						</div>,
// 		defaultSortOrder: 'descend',
// 		sorter: (a, b) => a.volume_USD-b.volume_USD,
// 	},
// 	{
// 		title: <Flex>Market Cap&nbsp;
// 					<Popover content={contentMarket} title="">
// 						<QuestionMark>?</QuestionMark>
// 					</Popover>
// 				</Flex>,
// 		key: 'market_cap',
// 		render: record => <div>
// 							<div>{record.market_cap_USD.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}&nbsp;USD</div>
// 							<Gray>{record.market_cap_TRX.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}&nbsp;ACG</Gray>
// 						</div>,
// 		defaultSortOrder: 'descend',
// 		sorter: (a, b) => a.market_cap_USD-b.market_cap_USD,
// 	},
// 	{
// 		title: 'Token Holders',
// 		key: 'token_holder',
// 		render: record => <span>{record.token_holder.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>,
// 	},
// 	{
// 		title: 'Operation',
// 		key: 'operation',
// 		width: 100,
// 		render: record => <div>
// 							<Bt5><Link to={"/contract/"+record.address} target="_blank"><Button type="primary" danger block >Detail</Button></Link></Bt5>
// 							<div><Link to="https://justswap.network/?lang=en-US#/home" target="_blank"><Button type="primary" danger block disabled={record.lock_trade?true:false}>Trade</Button></Link></div>
// 						</div>,
// 	},
// ];
const columns = [
	{
		title: 'No.',
		key: 'no',
		render: (value, item, index) => (index + 1),
		fixed: 'left',
		width: 70,
	},
	{
		title: 'ID',
		key: 'id',
		render: record => <StyledLink key={record.id} to={`/token/${record.id}`}>{record.id}</StyledLink>,
		width: 160,
	},
	{
		title: 'Name',
		key: 'name',
		render: record => <StyledLink key={record.name} to={`/token/${record.id}`}>{record.name}</StyledLink>,
	},
	{
		title: 'Abbreviation',
		dataIndex: 'abbr',
		key: 'abbr',
	},
	{
		title: 'Total Supply',
		dataIndex: 'total_supply',
		key: 'total_supply',
		render: record => { var text = record?currencyFormat(record):null;
							return text;
						}
	},
];


class TokenTable extends React.Component {
	componentDidMount() {
		const {pageTokens} = this.props;
		this.props.loadTokens(pageTokens.start_item, pageTokens.page_limit);
	}

	onChange=(pageNumber, pageLimit) =>{
	    this.props.updatePageTokens(pageNumber);
	    var {pageTokens} = this.props;
	    if(pageLimit!==pageTokens.page_limit){
	    	this.props.updatePageTokensLimit(pageLimit);
	    }
	    this.props.loadTokens(pageTokens.start_item, pageTokens.page_limit);
	}

	render() {
		var {tokens, pageTokens} = this.props;
		return (
			<Wrapper>
				<LeftHeader>List of Tokens</LeftHeader>
				<Table columns={columns}
					dataSource={tokens}
					rowKey="id"
					scroll={{ x: 1300 }} sticky
					pagination={false}
					loading={tokens.length === 0 ? true:false}
					locale={{ emptyText: 'Loading' }}
				/>
				<Pagin>
					<Pagination 
						current={pageTokens.start_page} 
						total={pageTokens.total_items} 
						onChange={this.onChange}
						showSizeChanger
						showQuickJumper/>
				</Pagin>
			</Wrapper>

		);
	}
}


const mapStateToProps = (state) => {
	return {
		tokens: state.tokens,
		pageTokens:state.pageTokens
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadTokens: (offset, limit) => {
			dispatch(loadTokens(offset, limit));
		},
		updatePageTokens: (page) => {
			dispatch(updatePageTokens(page));
		},
		updatePageTokensLimit: (limit) => {
			dispatch(updatePageTokensLimit(limit));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TokenTable);
import React from 'react';
import { Table, Pagination, Badge } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadBlocks,  updatePageBlocks, updatePageBlocksLimit } from '../../actions/blocks';
import styled from 'styled-components';
import {toTimeAgo} from '../../utils/utils';

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
const BadgeGreen = styled(Badge)`
    .ant-badge-count {
        background-color: #E1F3E0;
        color: black
    }  
`;

const BadgeRed = styled(Badge)`
    .ant-badge-count {
        background-color: #ff0000;
        color: black
    }  
`;
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
		title: 'Height',
		dataIndex: 'num',
		key: 'height',
		render: text => <StyledLink key={text} to={"/block/"+text} >{text}</StyledLink>,
	},
	{
		title: 'Age',
		key: 'age',
		render: record => {
			var time = record.timestamp?toTimeAgo(record.timestamp):"unknown";
			return time;
		}
	},
	{
		title: 'Status',
		key: 'status',
		render: () => confirm>=19?<BadgeGreen count="CONFIRMED"/>:<BadgeRed count="UNCOMFIRMED"/>
	},
	{
		title: 'Transactions',
		dataIndex: 'num_of_txs',
		key: 'transactions',
		render: text => <span>{text}</span>,	
	},
	{
		title: 'Producer',
		key: 'producer',
		render: record => <StyledLink key={record.witness_name} to={`/account/${record.witness_address}`} >{record.witness_name}</StyledLink>,
	}
];


class BlockTable extends React.Component {
	componentDidMount() {
		var {pageBlocks} = this.props;
		this.props.loadBlocks(pageBlocks.start_item,pageBlocks.page_limit);
	}

	onChange=(pageNumber, pageLimit) =>{
	    this.props.updatePageBlocks(pageNumber);
	    var {pageBlocks} = this.props;
	    if(pageLimit!==pageBlocks.page_limit){
	    	this.props.updatePageBlocksLimit(pageLimit);
	    }
	    this.props.loadBlocks(pageBlocks.start_item, pageBlocks.page_limit);
	}

	render() {
		var {blocks, pageBlocks} = this.props;
		return (
			<Wrapper>
				<LeftHeader>List of Blocks</LeftHeader>
				<Table columns={columns}
					dataSource={blocks}
					rowKey="num"
					scroll={{ x: 1300 }} sticky
					pagination={false}
					loading={blocks&&blocks.length === 0 ? true:false}
					locale={{ emptyText: 'Loading' }}
				/>
				<Pagin>
					<Pagination 
						current={pageBlocks.start_page} 
						total={pageBlocks.total_items} 
						onChange={this.onChange}
						showSizeChanger={false}
						showQuickJumper/>
				</Pagin>
			</Wrapper>

		);
	}
}


const mapStateToProps = (state) => {
	return {
		blocks: state.blocks,
		pageBlocks:state.pageBlocks
	};
};
const mapDispatchToProps = dispatch => {
	return {
		updatePageBlocks: (page) => {
			dispatch(updatePageBlocks(page));
		},
		updatePageBlocksLimit: (limit) => {
			dispatch(updatePageBlocksLimit(limit));
		},
		loadBlocks: (offset, limit) => {
			dispatch(loadBlocks(offset, limit));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BlockTable);
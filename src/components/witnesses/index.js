import React from 'react';
import { Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadWitnesses } from '../../actions/witnesses';
import styled from 'styled-components';
const StyleOutLink = styled.a`
	&:link, &:visited {
		color: #c23631;
	}
`;
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
const columns = [
	{
		title: 'No.',
		key: 'no',
		render: (value, item, index) => (index + 1),
		fixed: 'left',
		width: 70,
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
		render: text => <StyledLink key={text} to={`/account/${text}`}>{text}</StyledLink>,
	},
	{
		title: 'Vote Count',
		dataIndex: 'vote_count',
		key: 'vote_count',
	},
	{
		title: 'URL',
		dataIndex: 'url',
		key: 'url',
		render: text => <StyleOutLink key={text} href={text}>{text}</StyleOutLink>
	},
	{
		title: 'Total Produced',
		key: 'total_produced',
		dataIndex: 'total_produced',
	},
	{
		title: 'Total Missed',
		key: 'total_missed',
		dataIndex: 'total_missed',
		render: text => <span>{text?text:0}</span>
	},
	{
		title: 'Lastest block num',
		key: 'lastest_block_num',
		dataIndex: 'lastest_block_num',
		render: text => <StyledLink key={text} to={`/block/${text}`}>{text}</StyledLink>,
	},
	{
		title: 'Lastest Slot Num',
		key: 'lastest_slot_num',
		dataIndex: 'lastest_slot_num',
	},
	{
		title: 'Running',
		key: 'is_jobs',
		dataIndex: 'is_jobs',
		render: text => <Tag color={text ? 'green' : 'red'}>{text ? "RUNNING" : "NOT RUNNING"}</Tag>,
		fixed: 'right',
		defaultSortOrder: 'descend',
		sorter: (a, b) => {
			const isRunA = a.is_jobs ? 1 : 0;
			const isRunB = b.is_jobs ? 1 : 0;
			return isRunA - isRunB;
		},
	},
];

class WitnessTable extends React.Component {
	componentDidMount() {
		this.props.loadWitnesses();
	}
	render() {
		const witnesses = this.props.witnesses;
		return (
			<Wrapper>
				<LeftHeader>List of Witness</LeftHeader>
				<Table columns={columns}
					dataSource={witnesses}
					rowKey="address"
					scroll={{ x: 1500 }} sticky
					loading={witnesses.length === 0 ? true:false}
					locale={{ emptyText: 'Loading' }}
				/>
			</Wrapper>

		);
	}
}


const mapStateToProps = (state) => {
	return {
		witnesses: state.witnesses,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadWitnesses: () => {
			dispatch(loadWitnesses());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(WitnessTable);
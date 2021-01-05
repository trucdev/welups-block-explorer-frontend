import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Table } from "antd";

const TitleAssetTable = styled.div`
	margin-top: 20px;
	border-bottom: 5px solid #C23631; 
	padding-bottom: 10px;
	padding-top: 10px;
	text-align: left;
	padding-left: 15px;
	background-color: #FAFAFA;
`;
const TableTitle = styled.h3`
	font-size: 20px;
`;
const AssetTable = styled.div`
	margin: 5px;
`;
class AssetsCard extends Component {
	
	render() {
		let i = 1
		const data = [];
		for( let key in this.props.account.asset ) {
			data.push({
				key: i,
				num: i,
				asset: key,
				value: this.props.account.asset[key],
			}); i++
		}
		const columns = [
			{
				title: "No.",
				dataIndex: "num"
			},
			{
				title: "Asset",
				dataIndex: "asset"
			},
			{
				title: "Value",
				dataIndex: "value",
				render: record => {return record.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");}
			}
		];
		return (
			<AssetTable>
				<TitleAssetTable>
					<TableTitle>Asset</TableTitle>
				</TitleAssetTable>
				<Table
					columns={columns}
					dataSource={data}
					pagination={{ pageSize: 50 }}
					scroll={{ y: 240 }}
				/>

			</AssetTable>


		);
	}
}


const mapStateToProps = (state) => {
  
	return {
	  account: state.account,
	};
  };
  const mapDispatchToProps = dispatch => {
	  return { };
  };
  export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
	AssetsCard
);
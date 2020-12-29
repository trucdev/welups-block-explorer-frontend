import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Menu, Row, Col, Input} from 'antd';
import {Div, Right, TextBox} from './style';
import { SettingOutlined, CopyOutlined, FileOutlined } from '@ant-design/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class ContractCode extends Component{
	render(){
		let {contract} = this.props;
		return (
			<div>
				<Div>
					<Row>
						<Col span={6}>
							<SettingOutlined />&nbsp;Contract ABI
						</Col>
						<Col span={18}>
							<Right><CopyToClipboard text={contract.abi?JSON.stringify(contract.abi):null}><CopyOutlined/></CopyToClipboard></Right>
						</Col>
					</Row>
					<TextBox rows={7} value={contract.abi?JSON.stringify(contract.abi):null} disabled/>
				</Div>
				<Div>
					<Row>
						<Col span={6}>
							<FileOutlined />&nbsp;Byte codes
						</Col>
						<Col span={18}>
							<Right><CopyToClipboard text={contract.bytecode}><CopyOutlined/></CopyToClipboard></Right>
						</Col>
					</Row>
					<TextBox rows={7} value={contract.bytecode} disabled/>
				</Div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contract: state.contract
	};
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(ContractCode);
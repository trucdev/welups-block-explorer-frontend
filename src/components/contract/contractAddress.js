import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Div, RedSpan} from './style';
import {Link} from "react-router-dom";
import {CopyOutlined, SwapOutlined, QrcodeOutlined} from '@ant-design/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Contract extends Component{
	render(){
		let {contractAddress} = this.props;
		return (
			<Div>
				<h2>
					<RedSpan>{contractAddress}</RedSpan>&nbsp;
					<CopyToClipboard text={contractAddress}><CopyOutlined/></CopyToClipboard>&nbsp;
					<SwapOutlined />&nbsp;
					<QrcodeOutlined />
				</h2>
			</Div>			
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contractAddress: state.contract.contract_address
	};
};

const mapDispatchToProps = (dispatch,props) => {
	return {
		
	};
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Contract);
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {CopyOutlined} from '@ant-design/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {TableRow, Th} from './style';
import {StyledLink} from './style';

class BlockProducer extends Component{
	render(){
		let {producer_name} = this.props;
		let {producer_hash} = this.props;

		return (
			<TableRow>
				<Th>
					<span>Produced by</span>:
				</Th>
				<td>
					<div>
						<StyledLink to={"/account/"+producer_hash} target="_blank">{producer_name ? producer_name : producer_hash}</StyledLink><CopyToClipboard text={producer_name ? producer_name : producer_hash}><CopyOutlined/></CopyToClipboard>
					</div>
				</td>
			</TableRow>				
		);
	}
}

const mapStateToProps = (state) => {
	return {
		producer_name:state.block.producer_name,
		producer_hash:state.block.producer_hash,
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockProducer);
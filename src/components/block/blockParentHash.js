import React, {Component} from 'react';
import { connect } from 'react-redux';
import {CopyOutlined} from '@ant-design/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {TableRow, Th} from './style';
import {StyledLink} from './style';

class BlockParentHash extends Component{
	render(){
		let {parent_hash} = this.props;

		return (
			<TableRow>
				<Th>
					<span>Parent Hash</span>:
				</Th>
				<td>
					<div>
						<StyledLink to={"/block/"+parent_hash} target="_blank">{parent_hash}</StyledLink><CopyToClipboard text={parent_hash}><CopyOutlined/></CopyToClipboard>
					</div>
				</td>
			</TableRow>				
		);
	}
}

const mapStateToProps = (state) => {
	return {
		parent_hash:state.block.parent_hash,
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockParentHash);
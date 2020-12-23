import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BorderOutlined } from '@ant-design/icons';
import {Title} from './style';

class BlockNum extends Component{
	render(){
		let {block_num} = this.props;
		return (
			<Title>
					<BorderOutlined/>&nbsp;Block&nbsp;#{block_num}
			</Title>					
		);
	}
}

const mapStateToProps = (state) => {
	return {
		block_num:state.block.block_num
	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockNum);
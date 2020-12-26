import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Menu} from 'antd';
import Transaction from './transaction';

class BlockMenu extends Component{
	render(){
		return (
			<div>
				<Menu mode="horizontal">
		            <Menu.Item key="blockTransaction">
		            	TRANSACTION
		            </Menu.Item>
		        </Menu>
		        <Transaction/>
			</div> 
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockMenu);
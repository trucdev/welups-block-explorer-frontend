import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Menu} from 'antd';
import ContractCodeMenu from './contractCodeMenu';

class ContractMenu extends Component{
	render(){
		return (
			<div>
				<Menu mode="horizontal">
		            <Menu.Item key="contractCode">
		            	CONTRACT
		            </Menu.Item>
		        </Menu>
		        <ContractCodeMenu/>
			</div> 
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(ContractMenu);
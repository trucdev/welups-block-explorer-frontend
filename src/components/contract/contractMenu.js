import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Menu} from 'antd';
import ContractCodeMenu from './contractCodeMenu';
import TokenBalance from './tokenBalance';
import { updateContractMenu } from '../../actions/contract';

class ContractMenu extends Component{
	onClick=(item)=>{
		this.props.updateContractMenu(item.key);
	}

	render(){
		var {contractMenu} = this.props;
		var item = (menuItem) =>{
			switch(menuItem){
				case "contractCode": return <ContractCodeMenu/>;
				case "tokenBalance": return <TokenBalance/>;
				default:return;
			}
		}
		return (
			<div>
				<Menu mode="horizontal" 
				defaultSelectedKeys={contractMenu.menuItem}
				onClick={this.onClick}>
					<Menu.Item key="tokenBalance">
		            	TOKEN BALANCE
		            </Menu.Item>
		            <Menu.Item key="contractCode">
		            	CONTRACT
		            </Menu.Item>
		        </Menu>
		        {item(contractMenu)}
			</div> 
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contractMenu:state.contractMenu
	};
};
const mapDispatchToProps = dispatch => {
	return {
		updateContractMenu: (menuItem) => {
			dispatch(updateContractMenu(menuItem));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ContractMenu);
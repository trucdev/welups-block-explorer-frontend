import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Menu} from 'antd';
import ContractCode from './contractCode';
import {Wrapper, BorderRed, Div, Item} from './style';

class ContractCodeMenu extends Component{
	render(){
		return (
			<Wrapper>
				<Div>
					<Menu mode="horizontal">
			            <Menu.Item key="contractCode">
			            	<Item>Code</Item>     
			            </Menu.Item>
			        </Menu>
			        <ContractCode/>
				</Div>
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		
	};
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(ContractCodeMenu);
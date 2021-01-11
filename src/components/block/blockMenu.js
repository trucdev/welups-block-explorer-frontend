import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Transaction from './transaction';
import styled from 'styled-components';

const Title = styled.span`
	font-weight: 600;
	font-size: 16px;
`;

class BlockMenu extends Component {
	render() {
		return (
			<div>
				<Menu mode="horizontal">
					<Menu.Item key="blockTransaction">
						<Title>
						TRANSACTION
						</Title>
		            </Menu.Item>
				</Menu>
				<Transaction />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockMenu);
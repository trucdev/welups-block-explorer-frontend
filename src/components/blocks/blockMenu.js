import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Link, Switch
} from "react-router-dom";
import {Menu} from 'antd';
import Transaction from './transaction';

class BlockMenu extends Component{
	render(){
		return (
			<div>
				<Menu mode="horizontal">
		            <Menu.Item key="blockTransaction">
		            	Transaction
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
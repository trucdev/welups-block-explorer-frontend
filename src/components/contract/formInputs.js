import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Form, Input} from 'antd';
import {FuncWrapper, FuncName, FuncBody} from './style';

class FormInputs extends Component{
	render(){
		var {inp, ind} = this.props;
		return (
			<Form.Item
		        name={ind}
		    >
		        <Input placeholder={inp.name+" "+inp.type}/>
		    </Form.Item>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};
const mapDispatchToProps = dispatch => {
	return {
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(FormInputs);
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Form} from 'antd';
import {FuncWrapper, FuncName, FuncBody, Result, Root} from './style';
import FormInputs from './formInputs';
import * as action from '../../actions/contract';

class ReadContract extends Component{
	constructor(props){
        super(props);
        this.state = {
            contractResult:null
        }
    }

	triggerSmartContract = async (values)=> {
		var {func, addr} = this.props;
		var params = Object.keys(values).map((key) => values[key]);
        let result = await action.triggerReadFunc(params, func, addr);
        this.setState({
            contractResult:result
        });
	}

	render(){
		var {func, no} = this.props;
		var form = func.inputs?func.inputs.map((inp, index)=>{
			return <FormInputs key={index} inp={inp} ind={index}/>
		}):null;
		return (
			<FuncWrapper>
				<FuncName>{no+". "+func.name}</FuncName>
				<FuncBody>
					<Form
				        name={"func"+no}
				        onFinish={this.triggerSmartContract}
				    >
				    	{form}
				        <Form.Item >
				        	<Button htmlType="submit">Call</Button>
				        </Form.Item>
				    </Form>
				    <Result><Root>{this.state.contractResult?"root: ":null}</Root>{this.state.contractResult}</Result>
				</FuncBody>
			</FuncWrapper>
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
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ReadContract);
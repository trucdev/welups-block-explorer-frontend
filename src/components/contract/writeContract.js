import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input} from 'antd';
import {FuncWrapper, FuncName, FuncBody, Result, Root} from './style';
import FormInputs from './formInputs';
import * as action from '../../actions/contract';

class WriteContract extends Component{
	constructor(props){
        super(props);
        this.state = {
            contractResult:null
        }
    }

	triggerSmartContract = async (values)=> {
		var {func, addr} = this.props;
		var params = [];
		Object.keys(values).map((key) => {
			if(key!="acgSend"){
				params.push(values[key]);
			}
			return null;
		});
	    const trc20ContractAddress = addr;//contract address
        let contract = await window.tronWeb.contract().at(trc20ContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let result="";
        if(values.acgSend){
        	result = await action.triggerWriteFunc(params, func, addr, values.acgSend);
        }else{
        	result = await action.triggerWriteFunc(params, func, addr);
        }
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
				    	{
				    		func.stateMutability===4
				    		?<Form.Item
						        name="acgSend"
						    >
						        <Input placeholder="ACG send amount"/>
						    </Form.Item>
				    		:null
				    	}
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
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(WriteContract);
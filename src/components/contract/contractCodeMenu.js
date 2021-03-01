import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Tabs, Input} from 'antd';
import ContractCode from './contractCode';
import ReadContract from './readContract';
import WriteContract from './writeContract';
import {Wrapper, Div} from './style';
import {updatePriKey} from '../../actions/contract';

class ContractCodeMenu extends Component{

	onChange = (e)=>{
		this.props.updatePriKey(e.target.value);
	}

	render(){
		let {contract} = this.props;
		var noRead = 0;
		var noWrite = 0;
		var read = contract.abi?contract.abi.map((func, index)=>{
			if(!func.stateMutability||func.stateMutability===0||func.stateMutability===1||func.stateMutability===2){
				noRead++;
				return <ReadContract key={index} func = {func} no={noRead} addr = {contract.contract_address}/>;
			}
			return null;
		}):null;
		var write = contract.abi?contract.abi.map((func, index)=>{
			if(func.stateMutability===4||func.stateMutability===3){
				noWrite++;
				return <WriteContract key={index} func = {func} no={noWrite} addr = {contract.contract_address}/>;
			}
			return null;
		}):null;
		return (
			<Wrapper>
				<Div>
			        <Tabs defaultActiveKey="1" type="card">
					    <Tabs.TabPane tab="Code" key="1">
					        <ContractCode/>
					    </Tabs.TabPane>
					    <Tabs.TabPane tab="Read Contract" key="2">
					    	<Wrapper>
					    		<Input defaultValue={contract.prikey} placeholder="Enter your private key" onChange={this.onChange}/>
					    	</Wrapper>
					        {read}
					    </Tabs.TabPane>
					    <Tabs.TabPane tab="Write Contract" key="3">
					    	<Wrapper>
					    		<Input defaultValue={contract.prikey} placeholder="Enter your private key" onChange={this.onChange}/>
					    	</Wrapper>
					        {write}
					    </Tabs.TabPane>
					</Tabs>
				</Div>
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contract: state.contract,
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePriKey: (key) => {
      dispatch(updatePriKey(key));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ContractCodeMenu);
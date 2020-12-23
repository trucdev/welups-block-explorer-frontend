import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './card';
import Trigger from './lowerCard/triggerSmartContract';
import TransferContract from './lowerCard/transferContract';
import TransferAssetContract from './lowerCard/transferAssetContract';
import CreateSmartContract from './lowerCard/createSmartContract';
import styled from 'styled-components';
import { loadTransactionDetails } from '../../actions/transaction';


const Container = styled.div`
	margin: 5px;
`;
const CardTitle = styled.div`
    border-bottom: 5px solid #C23631;
    font-size: 20px;
	text-align: left;
	`;



class TransactionDetails extends Component {
	test=(type)=>{
		switch(type){
			case "TriggerSmartContract": return <Trigger/>;
			case "TransferContract": return <TransferContract/>;
			case "TransferAssetContract": return <TransferAssetContract/>;
			case "CreateSmartContract": return <CreateSmartContract/>;
			default: return "";
		};
	}

	componentDidMount(){
		this.props.loadTransactionDetails(this.props.txHash);
	}
	render() {
		const TransactionType = this.props.transaction.contract.type;
		
		return (
			<Container>
				<CardTitle>
					<h3 >TRANSACTION DETAILS</h3>
				</CardTitle>
				<Card txHash = {this.props.match.params.id}/>
				{/* TODO: NEED TO CHECK TYPE OF TRANSACTION AND SWITCH DETAILS */}
				{/* <Detail /> */}
				{this.test(TransactionType)}
			</Container>


		);
	};
};



const mapStateToProps = (state) => {
  
	return {
	  transaction: state.transaction,
	};
  };
  const mapDispatchToProps = dispatch => {
	  return {
		  loadTransactionDetails: (txHash) => {
			  dispatch(loadTransactionDetails(txHash));
		  },
	  };
  };
  export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
	  TransactionDetails);
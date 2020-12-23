import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Th, QuestionMark, Flex} from './style';
import {Link} from "react-router-dom";

class ContractInformation extends Component{
	render(){
		let {contract} = this.props;
		return (
			<tbody>
				<TableRow>
					<Th>
						<span>Creator:</span>
					</Th>
					<td>
						<Link to={"/account/"+contract.creator_address} target="_blank">
							{contract.creator_address?contract.creator_address.substring(0,5)+"..."+contract.creator_address.substring(contract.creator_address.length-4,contract.creator_address.length-1):"0"}
						</Link>&nbsp;
						<span>At txn</span>&nbsp;
						<Link to={"/transaction/"+contract.creation_transaction_address} target="_blank">
							{contract.creation_transaction_address?contract.creation_transaction_address.substring(0,5)+"..."+contract.creation_transaction_address.substring(contract.creation_transaction_address.length-4,contract.creation_transaction_address.length-1):"0"}
						</Link>
					</td>
				</TableRow>	
				<TableRow>
					<Th>
						<span>Creation Time:</span>
					</Th>
					<td>
						<span>{contract.creation_time}</span>
					</td>
				</TableRow>
				<TableRow>
					<Th>
						<span>Available Energy:</span>
					</Th>
					<td>
						<span>{contract.available_energy}&nbsp;ENERGY</span>
					</td>
				</TableRow>
				<TableRow>
					<Th>
						<Flex>Energy Consumption Ratio&nbsp;<QuestionMark>?</QuestionMark>&nbsp;:</Flex>
					</Th>
					<td>
						<span>Contracts{contract.energy_ratio_contract}%&nbsp;&nbsp;Users{contract.energy_ratio_user}%</span>
					</td>
				</TableRow>
				<TableRow>
					<Th>
						<Flex>Initial Asset&nbsp;<QuestionMark>?</QuestionMark>&nbsp;:</Flex>
					</Th>
					<td>
						<span>{contract.initial_asset}&nbsp;TRX</span>
					</td>
				</TableRow>
			</tbody>
			
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contract: state.contract
	};
};

const mapDispatchToProps = (dispatch,props) => {
	return {
		
	};
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ContractInformation);
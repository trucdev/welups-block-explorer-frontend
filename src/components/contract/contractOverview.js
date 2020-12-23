import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Th} from './style';
import {Link} from "react-router-dom";

class ContractOverview extends Component{
	render(){
		let {contract} = this.props;
		return (
			<tbody>
				<TableRow>
					<Th>
						<span>Name:</span>
					</Th>
					<td>
						<span>{contract.name}</span>
					</td>
				</TableRow>	
				<TableRow>
					<Th>
						<span>Balance:</span>
					</Th>
					<td>
						<span>{contract.balance}</span>
					</td>
				</TableRow>
				<TableRow>
					<Th>
						<span>Transactions:</span>
					</Th>
					<td>
						<span>{contract.transactions}</span>
					</td>
				</TableRow>
				<TableRow>
					<Th>
						<span>Token Tracker:</span>
					</Th>
					<td>
						<Link to="/" target="_blank" value={contract.token_tracker_address}>{contract.token_tracker_name}</Link>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ContractOverview);
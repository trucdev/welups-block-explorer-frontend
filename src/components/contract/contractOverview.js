import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Th} from './style';
import {decimalFormat, currencyFormat} from '../../utils/utils';

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
						<span>{currencyFormat(decimalFormat(contract.balance/Math.pow(10,6)))} ACG</span>
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
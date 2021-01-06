import React, {Component} from 'react';
import { connect } from 'react-redux';
import {TableRow, Th, QuestionMark, Flex, contentRatio, StyledLink} from './style';
import {Popover } from 'antd';

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
						<StyledLink to={"/account/"+contract.creator_address} target="_blank">
							{contract.creator_address?contract.creator_address.substring(0,7)+"..."+contract.creator_address.substring(contract.creator_address.length-4,contract.creator_address.length-1):"0"}
						</StyledLink>
					</td>
				</TableRow>	
				<TableRow>
					<Th>
						<span>Available Energy:</span>
					</Th>
					<td>
						<span>{contract.available_energy?contract.available_energy.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","):0}&nbsp;ENERGY</span>
					</td>
				</TableRow>
				<TableRow>
					<Th>
						<Flex>Energy Consumption Ratio&nbsp;
							<Popover content={contentRatio} title="">
								<QuestionMark>?</QuestionMark>
							</Popover>&nbsp;:
						</Flex>
					</Th>
					<td>
						<span>Contracts{contract.energy_ratio_contract}%&nbsp;&nbsp;Users{contract.energy_ratio_user}%</span>
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
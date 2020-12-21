import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './card';
import styled from 'styled-components';


const Container = styled.div`
	margin: 5px;
`;
const CardTitle = styled.div`
    border-bottom: 5px solid #C23631;
    font-size: 20px;
	text-align: left;
	`;
class AccountDetails extends Component {
	render() {
		return (
			<Container>
				<CardTitle>
					<h3 >ACCOUNT DETAILS</h3>
				</CardTitle>
				<Card addr = {this.props.match.params.id}/>
				{/* TODO: NEED TO CHECK TYPE OF TRANSACTION AND SWITCH DETAILS */}
				{/* <Detail /> */}
				
			</Container>


		);
	}
}


const mapStateToProps = (state) => {
	return {

	};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(AccountDetails);
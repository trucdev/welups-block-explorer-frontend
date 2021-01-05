import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './card';
import styled from 'styled-components';
import AssetsCard from './assetsCard';

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
				<AssetsCard/>
			</Container>


		);
	}
}


const mapStateToProps = (state) => {
	return {
	  account: state.account,
	};
  };
  const mapDispatchToProps = dispatch => {
	  return {
	  };
  };
  export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AccountDetails);
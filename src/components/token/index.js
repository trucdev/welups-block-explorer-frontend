import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './card';
import styled from 'styled-components';
import { loadTokenDetail } from '../../actions/token';

const Container = styled.div`
	margin: 5px;
`;
const CardTitle = styled.div`
    border-bottom: 5px solid #C23631;
    font-size: 20px;
	text-align: left;
	`;
const CardDes = styled.div`
	width: 100%;
	background-color: #F3F3F3;
	flex-direction: column;
	display: flex;
	padding-left: 30px;
	padding-right: 30px;
	text-align: left;
	padding-bottom: 5px;
	padding-top: 5px;
`;
const StyledName = styled.span`
	font-size: 25px;
	font-weight: 500;
`;
const StyledDes = styled.span`
	font-size: 15px;
	font-weight: 300;
`;
class TokenDetails extends Component {
	componentDidMount(){
		this.props.loadTokenDetail(this.props.match.params.id);
	  }
	render() {
		return (
			<Container>
				<CardTitle>
					<h3 >{this.props.token.abbr}</h3>
				</CardTitle>
				<CardDes>
					<StyledName>{this.props.token.name}</StyledName>
					<StyledDes>{this.props.token.description}</StyledDes>
				</CardDes>
				<Card/>
			</Container>


		);
	}
}


const mapStateToProps = (state) => {
	return {
	  token: state.token,
	};
  };
  const mapDispatchToProps = dispatch => {
	  return {  
		loadTokenDetail: (id) => {
			dispatch(loadTokenDetail(id));
		},
	  };
  };
  export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TokenDetails);
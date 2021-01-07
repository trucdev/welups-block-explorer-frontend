import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {currencyFormat, toDateTime} from '../../utils/utils';

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const CardContent = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
    border-bottom: 1px solid #EEEEEE;
    padding-top: 10px;
    padding-bottom: 10px;
`;
const Content = styled.div`
    padding-left: 25px;
    padding-right: 25px;
    background-color: #ffffff;
    width: 100%;
`;
const RowTitle = styled.div`
  min-width: 140px;
  text-align: left;
  height: 30px;
`;
const StyledTitle = styled.span`
  font-weight: 500;
  color: #666;
`;
const RowValue = styled.div`
  text-align: left;
  overflow: auto;
`;
const RedText = styled.span`
    color: #E50915;
`;
const StyledLink = styled(Link)`
	&:link, &:visited {
		color: #c23631;
	}
`;
const LinkA = styled.a`
		color: #c23631;
`;
class Card extends Component {
  render() {
    const content = [
        { title: 'Id',  value: this.props.token.id},
        { title: 'Issuer',  value: <StyledLink to={`/account/${this.props.token.owner_address}`}>{this.props.token.owner_address}</StyledLink>},,
        { title: 'Total supply',  value: <RedText>{currencyFormat(this.props.token.total_supply)}</RedText>},
        { title: 'Total asset',  value: <RedText>{currencyFormat(this.props.token.total_assets)}</RedText>},
        { title: 'Price',  value: <span> {this.props.token.trx_num/this.props.token.num/1000000} TRX</span> },
        { title: 'Start time',  value: toDateTime(this.props.token.start_time)},
        { title: 'End time',  value:   toDateTime(this.props.token.end_time)},
        { title: 'Offical Website',  value: <LinkA href={this.props.token.url} target="_blank">{this.props.token.url}</LinkA>},
    ];
    return (
      <Wrap>
        <Content>
          {content.map((item,index) => {
            return (
              <CardContent key ={index}>
                <RowTitle ><StyledTitle>{item.title}:</StyledTitle></RowTitle>
                <RowValue>{item.value}</RowValue>
              </CardContent>
            )
          })}
        </Content>
      </Wrap>
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Card);

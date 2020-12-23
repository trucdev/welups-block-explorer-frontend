import React, { Component } from "react";
import { connect } from "react-redux";
import { loadTransactionDetails } from '../../../actions/transaction';
import { FaExchangeAlt } from "react-icons/fa";
import styled from 'styled-components';
import { ArrowRightOutlined, RightOutlined, CaretRightOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view';

const From = 'TFi3v5PtYRnVdC43qSvPR3upZhgreiURga';
const FromLenght = From.length;
const To = 'TL6K6iaEkn8kdnJ79a8Be3S4RFf4pFkGE8';
const ToLenght = To.length;

const Righticon = styled.span`
    color: #939393;
    font-size: 12px;
`;
const RedText = styled.span`
    color: #E50915;
    `;
const Details = styled.div`
display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ffffff;
    margin-top: 15px;
`;
const Top = styled.div`
    padding-top: 25px;
    padding-bottom: 10px;
    align-items: top;
    padding-left: 25px;
    display: inline-block;
`;
const DetailTop = styled.h5`
    font-size: 14px;
`;
const Content = styled.div`
width: 100%;
    padding-left: 25px;
    padding-right: 25px;
    background-color: #ffffff;
`;
const Row = styled.div`
    display: flex;
    border-bottom: 1px solid #EEEEEE;
`;;
const TitleContainer = styled.div`
height: 40px;
    align-items: flex-start;
    display: flex;
    font-size: 14px;
    width: 12%;
    justify-content:flex-start;
    padding-top: 10px;
`;
const FillContainer = styled.div`
    align-items: flex-start;
    font-size: 14px;
    width: 88%;
    text-align: left;
    padding-top: 10px;
    padding-bottom: 3px;
`;
const ContentLine = styled.div`
    width: 100%;
    display: inline-block;
    padding-bottom: 7px;
`;
const Arrow = styled.span`
    color: #939393;
    font-size: 12px;
`;
const ConsumeLeft = styled.div`
    width: 20%;
`;
const ConsumeRight = styled.div`
    width: 80%;
    
`;
const MakeItaRow = styled.div`
    display: flex;
`;
class TransferContract extends Component {

  render() {    
    
    const { hash, result, status, blockNum, timestamp, numOfBlocks, contract}= this.props.transaction;
    return (
      <Details>
        <Top>
          <DetailTop>
            <FaExchangeAlt /> Transfer Contract
          </DetailTop>
        </Top>
        <Content>
          <Row>
            <TitleContainer>
              <span >From</span>:
            </TitleContainer>
            <FillContainer>
            <RedText>{this.props.transaction.contract.parameter.raw.OwnerAddress}</RedText>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >To</span>:
            </TitleContainer>
            <FillContainer>
            <RedText>{this.props.transaction.contract.parameter.raw.ToAddress}</RedText>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Amount</span>:
            </TitleContainer>
            <FillContainer>
            <span>{this.props.transaction.contract.parameter.raw.Amount}</span>
            </FillContainer>
          </Row>
          {/* <Row>
            <TitleContainer>
              <span >Note</span>:
            </TitleContainer>
            <FillContainer>
              <span >Bad and Boujee</span>
            </FillContainer>
          </Row> */}
          {/* CONSUMER BANDWIDTH */}
          {/* <Row>
            <TitleContainer>
              <span >Consume bandwidth</span>:
            </TitleContainer>
            <FillContainer>
              <ContentLine>
                <span >280 Bandwidth</span>
              </ContentLine>
              <ContentLine>
                <MakeItaRow>
                  <ConsumeLeft>
                    <Righticon><RightOutlined /></Righticon>
                    <span>Consumption of frozen/free bandwidth:</span>
                  </ConsumeLeft>
                  <ConsumeRight>
                    <span>280 Bandwidth</span>
                  </ConsumeRight>
                </MakeItaRow>
              </ContentLine>
              <ContentLine>
                <MakeItaRow>
                  <ConsumeLeft>
                    <Righticon><RightOutlined /></Righticon>
                    <span>Burn 0.014 TRX for bandwidth:</span>
                  </ConsumeLeft>
                  <ConsumeRight>
                    <span>0 Bandwidth</span>
                  </ConsumeRight>
                </MakeItaRow>
              </ContentLine>
            </FillContainer>
          </Row> */}
        </Content>
      </Details>
    );
  }
}


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
  TransferContract
);
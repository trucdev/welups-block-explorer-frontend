import React, { Component } from "react";
import { connect } from "react-redux";
import { loadTransactionDetails } from '../../../actions/transaction';
import { FaExchangeAlt } from "react-icons/fa";
import styled from 'styled-components';




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

class Trigger extends Component {

  render() {
    
    return (
      <Details>
        <Top>
          <DetailTop>
            <FaExchangeAlt /> Trigger Smart Contracts
          </DetailTop>
        </Top>
        <Content>
          <Row>
            <TitleContainer>
              <span >Owner address</span>:
            </TitleContainer>
            <FillContainer>
            <RedText >{this.props.transaction.contract.parameter.raw.OwnerAddress}</RedText>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Contract address</span>:
            </TitleContainer>
            <FillContainer>
              <ContentLine>
              <RedText >{this.props.transaction.contract.parameter.raw.ContractAddress}</RedText>
              </ContentLine>
              {/* <ContentLine>
                <Righticon><RightOutlined /></Righticon>
                <span>From </span>
                <RedText >{From.slice(0, 14)}</RedText>...
                <RedText >{From.slice(FromLenght - 5, FromLenght)} </RedText>
                <Arrow><ArrowRightOutlined /></Arrow>
                <span>  To </span>
                <RedText >{To.slice(0, 14)}</RedText>...
                <RedText >{To.slice(ToLenght - 5, ToLenght)} </RedText>
                <span>  0 </span>
                <span>TRX</span>
              </ContentLine>
              <ContentLine>
                <Righticon><RightOutlined /></Righticon>
                <span>From </span>
                <RedText >{From.slice(0, 14)}</RedText>...
                <RedText >{From.slice(FromLenght - 5, FromLenght)} </RedText>
                <Arrow><ArrowRightOutlined /></Arrow>
                <span>  To </span>
                <RedText >{To.slice(0, 14)}</RedText>...
                <RedText >{To.slice(ToLenght - 5, ToLenght)} </RedText>
                <span>  0 </span>
                <span>TRX</span>
              </ContentLine> */}
            </FillContainer>
          </Row>
          {/* <Row>
            <TitleContainer>
              <span >Value</span>:
            </TitleContainer>
            <FillContainer>
              <span >0 TRX</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >TRC20 Transfers</span>:
            </TitleContainer>
            <FillContainer>
              <ContentLine>
                <span>From </span>
                <RedText >{From.slice(0, 14)}</RedText>...
                <RedText >{From.slice(FromLenght - 5, FromLenght)} </RedText>
                <Arrow><ArrowRightOutlined /></Arrow>
                <span>  To </span>
                <RedText >{To.slice(0, 14)}</RedText>...
                <RedText >{To.slice(ToLenght - 5, ToLenght)} </RedText>
                <span> 0.12584325484654565 </span>
                <RedText >ETVPro</RedText>
              </ContentLine>
            </FillContainer>
          </Row> */}
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
          </Row>
          <Row>
            <TitleContainer>
              <span >Consume energy</span>:
            </TitleContainer>
            <FillContainer>
              <ContentLine>
                <span >65.621 Energy</span>
              </ContentLine>
              <ContentLine>
                <MakeItaRow>
                  <ConsumeLeft>
                    <Righticon><RightOutlined /></Righticon>
                    <span>Energy usage from user's frozen energy:</span>
                  </ConsumeLeft>
                  <ConsumeRight>
                    <span>0 Energy</span>
                  </ConsumeRight>
                </MakeItaRow>
              </ContentLine>
              <ContentLine>
                <MakeItaRow>
                  <ConsumeLeft>
                    <Righticon><RightOutlined /></Righticon>
                    <span>Burn 0 TRX for energy:</span>
                  </ConsumeLeft>
                  <ConsumeRight>
                    <span>65,621 Energy</span>
                  </ConsumeRight>
                </MakeItaRow>
              </ContentLine>
              <ContentLine>
                <MakeItaRow>
                  <ConsumeLeft>
                    <Righticon><RightOutlined /></Righticon>
                    <span>Consume contract owner's Energy:</span>
                  </ConsumeLeft>
                  <ConsumeRight>
                    <span>0 Energy</span>
                  </ConsumeRight>
                </MakeItaRow>
              </ContentLine>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Fee limit</span>:
            </TitleContainer>
            <FillContainer>
              <span >1000 TRX</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Method calling</span>:
            </TitleContainer>
            <FillContainer>
              <span >getReward</span>
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
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  Trigger
);
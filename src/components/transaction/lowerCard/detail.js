import React, { Component } from "react";
import { connect } from "react-redux";
import { FaExchangeAlt } from "react-icons/fa";
import styled from 'styled-components';

const Details = styled.div`
display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ffffff;
    margin-top: 15px;
`;
const Top = styled.div`
display: flex;
padding-top: 10px;
padding-bottom: 10px;
align-items: top;
padding-left: 25px;
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
    flex-direction: row;
`;
const TitleContainer = styled.div`
height: 40px;
    align-items: center;
    display: flex;
    border-bottom: 1px solid #EEEEEE;
    font-size: 14px;
    width: 12%;
`;
const FillContainer = styled.div`
height: 40px;
    align-items: center;
    display: flex;
    border-bottom: 1px solid #EEEEEE;
    font-size: 14px;
    width: 88%;
`;
class Detail extends Component {
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
              <span >This content will show after calling API</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Contract address</span>:
            </TitleContainer>
            <FillContainer>
              <span >This content will show after calling API</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Value</span>:
            </TitleContainer>
            <FillContainer>
              <span >This content will show after calling API</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >TRC20 Transfers</span>:
            </TitleContainer>
            <FillContainer>
              <span >This content will show after calling API</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Consume bandwidth</span>:
            </TitleContainer>
            <FillContainer>
              <span >This content will show after calling API</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Consume energy</span>:
            </TitleContainer>
            <FillContainer>
              <span >This content will show after calling API</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Fee limit</span>:
            </TitleContainer>
            <FillContainer>
              <span >This content will show after calling API</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span >Method calling</span>:
            </TitleContainer>
            <FillContainer>
              <span >This content will show after calling API</span>
            </FillContainer>
          </Row>
        </Content>
      </Details>
    );
  }
}


const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  Detail
);

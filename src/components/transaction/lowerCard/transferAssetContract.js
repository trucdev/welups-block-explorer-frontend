import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaExchangeAlt } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { currencyFormat } from '../../../utils/utils'

const RedText = styled.span`
  color: #e50915;
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
`
const Top = styled.div`
  padding-top: 25px;
  padding-bottom: 10px;
  align-items: top;
  padding-left: 25px;
  display: inline-block;
`
const DetailTop = styled.h5`
  font-size: 14px;
`
const Content = styled.div`
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  background-color: #ffffff;
`
const Row = styled.div`
  display: flex;
  border-bottom: 1px solid #eeeeee;
`
const TitleContainer = styled.div`
  height: 40px;
  align-items: flex-start;
  display: flex;
  font-size: 14px;
  width: 12%;
  justify-content: flex-start;
  padding-top: 10px;
`
const FillContainer = styled.div`
  align-items: flex-start;
  font-size: 14px;
  width: 88%;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 3px;
`

class TransferAssetContract extends Component {
  render() {
    const FROM = this.props.transaction.contract.parameter.raw.owner_address
    const TO = this.props.transaction.contract.parameter.raw.to_address
    const PREC = this.props.transaction.contract.parameter.raw.precision
    return (
      <Details>
        <Top>
          <DetailTop>
            <FaExchangeAlt /> Transfer Asset Contract
          </DetailTop>
        </Top>
        <Content>
          <Row>
            <TitleContainer>
              <span>From</span>:
            </TitleContainer>
            <FillContainer>
              <Link to={'/account/' + FROM}>{FROM}</Link>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span>To</span>:
            </TitleContainer>
            <FillContainer>
              <Link to={'/account/' + TO}>{TO}</Link>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span>Amount</span>:
            </TitleContainer>
            <FillContainer>
              <span>
                {currencyFormat(
                  this.props.transaction.contract.parameter.raw.amount / Math.pow(10, PREC)
                )}
              </span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span>AssetName</span>:
            </TitleContainer>
            <FillContainer>
              <Link to={'/token/' + this.props.transaction.contract.parameter.raw.asset_name}>
                {this.props.transaction.contract.parameter.raw.asset_name}
              </Link>
            </FillContainer>
          </Row>
        </Content>
      </Details>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(TransferAssetContract)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaExchangeAlt } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { currencyFormat, decimalFormat } from '../../../utils/utils'
import { GLOBAL_SYMBOL } from '../../../constant'

const RedText = styled.span`
  color: #e50915;
`
const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  margin-top: 15px;
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

class IssueAssetContract extends Component {
  render() {
    const FROM = this.props.transaction.contract.parameter.raw.owner_address
    const TOTAL = this.props.transaction.contract.parameter.raw.total_supply
    const ACGNUM = this.props.transaction.contract.parameter.raw.trx_num
    const PRECIS = this.props.transaction.contract.parameter.raw.precision
    const TOKEN = this.props.transaction.contract.parameter.raw.abbr
    const URL = this.props.transaction.contract.parameter.raw.url
    return (
      <Details>
        <Top>
          <DetailTop>
            <FaExchangeAlt /> Issue Asset Contract
          </DetailTop>
        </Top>
        <Content>
          <Row>
            <TitleContainer>
              <span>From</span>:
            </TitleContainer>
            <FillContainer>
              <Link to={'/account/' + FROM}>
                <RedText>{FROM}</RedText>
              </Link>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span>Asset Name</span>:
            </TitleContainer>
            <FillContainer>
              <Link to={'/token/' + this.props.transaction.contract.parameter.raw.id}>
                <RedText>{TOKEN}</RedText>
              </Link>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span>Total Supply</span>:
            </TitleContainer>
            <FillContainer>
              <span>{currencyFormat(decimalFormat(TOTAL))}</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span>Price</span>:
            </TitleContainer>
            <FillContainer>
              <span>
                {currencyFormat(decimalFormat(ACGNUM / 1000000))} {GLOBAL_SYMBOL}
              </span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span>Precision</span>:
            </TitleContainer>
            <FillContainer>
              <span>{PRECIS}</span>
            </FillContainer>
          </Row>
          <Row>
            <TitleContainer>
              <span>Official Website</span>:
            </TitleContainer>
            <FillContainer>
              <a href={URL} target="_blank">
                <RedText>{URL}</RedText>
              </a>
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
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  IssueAssetContract
)

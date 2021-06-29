import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CopyOutlined } from '@ant-design/icons'
import { loadAccountDetails } from '../../actions/account'
import { Skeleton } from 'antd'
import { toDateTime, currencyFormat, decimalFormat } from '../../utils/utils'
import { GLOBAL_SYMBOL } from '../../constant'
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const CardContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
  border-bottom: 1px solid #eeeeee;
  padding-top: 10px;
  padding-bottom: 10px;
`
const Content = styled.div`
  padding-left: 25px;
  padding-right: 25px;
  background-color: #ffffff;
  width: 100%;
`
const CardHeader = styled.div`
  text-align: left;
  min-width: 140px;
  font-weight: 600;
`
const RowTitle = styled.div`
  min-width: 140px;
  text-align: left;
`
const RowValue = styled.div`
  text-align: left;
  overflow: auto;
`
const RedText = styled.span`
  color: #e50915;
`
class Card extends Component {
  componentDidMount() {
    this.props.loadAccountDetails(this.props.addr)
  }
  render() {
    const acc = this.props.account
    const content = [
      { title: 'Name', value: <RedText>{acc.name ? acc.name : '-'} </RedText> },
      {
        title: 'Total Balance',
        value: (
          <RedText>
            {currencyFormat(decimalFormat(acc.acgBalance / Math.pow(10, 6)))} {GLOBAL_SYMBOL}
          </RedText>
        ),
      },
      { title: 'Transactions', value: acc.transNum },
      { title: 'BandWidth Total', value: acc.bandwidthTotal },
      { title: 'Bandwidth  Used', value: acc.bandwidthUsed },
      { title: 'Available BandWidth', value: acc.bandwidthLeft },
      { title: 'Create Time', value: acc.createTime ? toDateTime(acc.createTime) : 'No Data' },
      { title: 'Frozen Balance', value: currencyFormat(acc.frozenBalance ? acc.frozenBalance : 0) },
      { title: 'Energy Total', value: acc.energyTotal },
      { title: 'Energy Used', value: acc.energyUsed },
      { title: 'Available Energy', value: acc.energyLeft },
    ]
    return (
      <Wrap>
        <Skeleton loading={acc.status === 'REQUESTING'}>
          <Content>
            <CardContent>
              <CardHeader>
                Address:{' '}
                <span>
                  {acc.address} <CopyOutlined />{' '}
                </span>
              </CardHeader>
            </CardContent>
            {content.map((item, index) => {
              return (
                <CardContent key={index}>
                  <RowTitle>{item.title}:</RowTitle>
                  <RowValue>{item.value}</RowValue>
                </CardContent>
              )
            })}
          </Content>
        </Skeleton>
      </Wrap>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadAccountDetails: (addr) => {
      dispatch(loadAccountDetails(addr))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Card)

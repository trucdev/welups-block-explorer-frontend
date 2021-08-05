import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Label = styled.span`
  margin-top: 10px;
  font-weight: normal;
  font-size: 14px;
`

const TransactionNum = styled.span`
  font-weight: bold;
  color: #0065d9;
`

class TransactionTotal extends Component {
  render() {
    let { transaction_num } = this.props
    return (
      <Label>
        A Total of <TransactionNum>{transaction_num}</TransactionNum> Transactions
      </Label>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transaction_num: state.block.transaction_num,
  }
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(TransactionTotal)

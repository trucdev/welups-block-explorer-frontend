import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from './card'
import Trigger from './lowerCard/triggerSmartContract'
import TransferContract from './lowerCard/transferContract'
import TransferAssetContract from './lowerCard/transferAssetContract'
import CreateSmartContract from './lowerCard/createSmartContract'
import IssueAssetContract from './lowerCard/issueAssetContract'
import FreezeBalanceContract from './lowerCard/freezeBalanceContract'
import styled from 'styled-components'
import { loadTransactionDetails } from '../../actions/transaction'
import ReactJson from 'react-json-view'
import { Skeleton } from 'antd'
import PageHeader from './../partials/pageHeader'

const Container = styled.div`
  margin: 5px;
`
const CardTransactionInfo = styled.div`
  box-shadow: 0px 3px 5px #00000014;
  border: 1px solid #e7eaf3;
  border-radius: 10px;
  overflow: hidden;
`
class TransactionDetails extends Component {
  contractDetails = (type, raw) => {
    switch (type) {
      case 'TriggerSmartContract':
        return <Trigger />
      case 'TransferContract':
        return <TransferContract />
      case 'TransferAssetContract':
        return <TransferAssetContract />
      case 'CreateSmartContract':
        return <CreateSmartContract />
      case 'AssetIssueContract':
        return <IssueAssetContract />
      case 'FreezeBalanceContract':
        return <FreezeBalanceContract />
      case '':
        return <Skeleton loading></Skeleton>
      default:
        return <ReactJson src={raw} />
    }
  }

  componentDidMount() {
    this.props.loadTransactionDetails(this.props.match.params.id)
  }
  render() {
    const TransactionType = this.props.transaction.contract.type
    const jsonContract = this.props.transaction.contract.parameter.raw
    return (
      <Container>
        <PageHeader>Transaction details</PageHeader>
        <CardTransactionInfo className="mb-25">
          <Card />
        </CardTransactionInfo>
        <CardTransactionInfo>
          {this.contractDetails(TransactionType, jsonContract)}
        </CardTransactionInfo>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadTransactionDetails: (txHash) => {
      dispatch(loadTransactionDetails(txHash))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  TransactionDetails
)

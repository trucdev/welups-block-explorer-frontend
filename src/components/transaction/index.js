import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from './card'
import Trigger from './lowerCard/triggerSmartContract'
import TransferContract from './lowerCard/transferContract'
import TransferAssetContract from './lowerCard/transferAssetContract'
import CreateSmartContract from './lowerCard/createSmartContract'
import IssueAssetContract from './lowerCard/issueAssetContract'
import styled from 'styled-components'
import { loadTransactionDetails } from '../../actions/transaction'
import ReactJson from 'react-json-view'
import { Skeleton } from 'antd'

const Container = styled.div`
  margin: 5px;
`
const CardTitle = styled.div`
  border-bottom: 5px solid #c23631;
  font-size: 20px;
  text-align: left;
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
        <CardTitle>
          <h3>TRANSACTION DETAILS</h3>
        </CardTitle>
        <Card />
        {this.contractDetails(TransactionType, jsonContract)}
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

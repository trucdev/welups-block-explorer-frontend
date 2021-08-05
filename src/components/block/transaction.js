import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransactionTable from './transactionTable'
import { Div } from './style'

class Transaction extends Component {
  render() {
    return (
      <div>
        <TransactionTable />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(Transaction)

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  loadTransactions,
  updatePageTransactions,
  updatePageTransactionsLimit,
} from '../../actions/transactions'
import { Table, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { toTimeAgo, decimalFormat, currencyFormat } from '../../utils/utils'
import { GLOBAL_SYMBOL } from '../../constant'
import PageHeader from '../partials/pageHeader'

const Container = styled.div`
  margin: 5px;
`
const RedText = styled.span`
  color: #e50915;
`
const PagiContainer = styled.div`
  margin-top: 15px;
  text-align: right;
`

class TransactionsList extends React.Component {
  componentDidMount() {
    const { transactions } = this.props
    this.props.loadTransactions(
      transactions.transactionPage.start_item,
      transactions.transactionPage.page_limit
    )
  }

  onChange = (pageNumber, pageLimit) => {
    this.props.updatePageTransactions(pageNumber)
    var { transactions } = this.props
    if (pageLimit !== transactions.transactionPage.page_limit) {
      this.props.updatePageTransactionsLimit(pageLimit)
    }
    this.props.loadTransactions(
      transactions.transactionPage.start_item,
      transactions.transactionPage.page_limit
    )
  }
  render() {
    var { transactions } = this.props
    const columns = [
      {
        title: 'No.',
        key: 'num',
        width: '5%',
        render: (value, item, index) =>
          index +
          1 +
          (transactions.transactionPage.current_page - 1) * transactions.transactionPage.page_limit,
      },
      {
        title: 'Hash',
        dataIndex: 'hash',
        key: 'hash',
        width: '12%',
        render: (text) => (
          <Link to={'/transaction/' + text}>
            <RedText>{text.substring(0, 6) + '...' + text.substring(59, 65)}</RedText>
          </Link>
        ),
      },
      {
        title: 'Block',
        dataIndex: 'block_number',
        key: 'blockNumber',
        width: '10%',
        render: (text) => (
          <Link to={'/block/' + text}>
            <RedText>{text}</RedText>
          </Link>
        ),
      },
      {
        title: 'Transaction type',
        dataIndex: 'contract',
        width: '15%',
        key: 'type',
        render: (record) => {
          return <span>{record.type}</span>
        },
      },
      {
        title: 'From',
        key: 'from',
        width: '12%',
        render: (record) => {
          if (record.contract.parameter.raw.owner_address) {
            return (
              <Link to={'/account/' + record.contract.parameter.raw.owner_address}>
                <RedText>
                  {record.contract.parameter.raw.owner_address.substring(0, 6) +
                    '...' +
                    record.contract.parameter.raw.owner_address.substring(
                      record.contract.parameter.raw.owner_address.length - 7,
                      record.contract.parameter.raw.owner_address.length - 1
                    )}
                </RedText>
              </Link>
            )
          } else {
            return <span>-</span>
          }
        },
      },
      {
        title: 'To',
        key: 'to',
        width: '12%',
        render: (record) => {
          if (record.contract.parameter.raw.to_address) {
            return (
              <Link to={'/account/' + record.contract.parameter.raw.to_address}>
                <RedText>
                  {record.contract.parameter.raw.to_address.substring(0, 6) +
                    '...' +
                    record.contract.parameter.raw.to_address.substring(
                      record.contract.parameter.raw.to_address.length - 7,
                      record.contract.parameter.raw.to_address.length - 1
                    )}
                </RedText>
              </Link>
            )
          } else {
            return <span>&nbsp; &nbsp; &nbsp; -</span>
          }
        },
      },
      {
        title: 'Amount',
        width: '12%',
        key: 'amount',
        render: (record) => {
          if (record.contract.type === 'TransferAssetContract') {
            return (
              <span>
                {currencyFormat(
                  decimalFormat(
                    record.contract.parameter.raw.amount /
                      Math.pow(10, record.contract.parameter.raw.precision)
                  )
                )}
              </span>
            )
          } else if (record.contract.type === 'TransferContract') {
            return (
              <span>
                {currencyFormat(decimalFormat(record.contract.parameter.raw.amount / 1000000))}
              </span>
            )
          } else {
            return <span>&nbsp; &nbsp; &nbsp; -</span>
          }
        },
      },
      {
        title: 'Asset',
        width: '10%',
        key: 'asset',
        render: (record) => {
          if (record.contract.type === 'TransferAssetContract') {
            return <RedText>{record.contract.parameter.raw.asset_name}</RedText>
          } else if (record.contract.type === 'TransferContract') {
            return <RedText>{GLOBAL_SYMBOL}</RedText>
          } else {
            return <span>&nbsp; &nbsp; &nbsp; -</span>
          }
        },
      },
      {
        title: 'Age',
        width: '20%',
        key: 'timestamp',
        render: (record) => {
          var time = record.timestamp ? toTimeAgo(record.timestamp) : 'unknown'
          return time
        },
      },
    ]
    return (
      <Container>
        <PageHeader>List of Transactions</PageHeader>
        <div id="datetime"></div>
        <Table
          columns={columns}
          dataSource={transactions.transactions}
          rowKey="hash"
          scroll={{ x: 1500 }}
          sticky
          pagination={false}
          loading={
            transactions.transactions !== null
              ? transactions.transactions.length === 0
                ? true
                : false
              : false
          }
          locale={{ emptyText: 'Loading' }}
        />
        <PagiContainer>
          <Pagination
            current={transactions.transactionPage.start_page}
            total={transactions.transactionPage.total_items}
            onChange={this.onChange}
            showSizeChanger
            showQuickJumper
          />
        </PagiContainer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadTransactions: (offset, limit) => {
      dispatch(loadTransactions(offset, limit))
    },
    updatePageTransactions: (page) => {
      dispatch(updatePageTransactions(page))
    },
    updatePageTransactionsLimit: (limit) => {
      dispatch(updatePageTransactionsLimit(limit))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  TransactionsList
)

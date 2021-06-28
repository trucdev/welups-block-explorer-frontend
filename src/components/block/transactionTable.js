import React from 'react'
import { connect } from 'react-redux'
import { BadgeGreen, BadgeRed, StyledLink } from './style'
import { Table } from 'antd'
import { toTimeAgo } from '../../utils/utils'

const columns = [
  {
    title: 'No.',
    key: 'no',
    render: (value, item, index) => index + 1,
    fixed: 'left',
    width: 70,
  },
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: (text) => (
      <StyledLink key={text} to={`/transaction/${text}`}>
        {text}
      </StyledLink>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (record) =>
      record === 'confirmed' ? <BadgeGreen count="CONFIRMED" /> : <BadgeRed count="UNCOMFIRMED" />,
  },
  {
    title: 'Age',
    key: 'age',
    render: (record) => {
      var time = record.timestamp ? toTimeAgo(record.timestamp) : 'unknown'
      return time
    },
  },
  {
    title: 'Contract Type',
    key: 'type',
    dataIndex: 'type',
  },
]

class TransactionTable extends React.Component {
  componentDidMount() {}
  render() {
    var { transactionList, confirm } = this.props
    if (transactionList) {
      transactionList.map((item) => {
        item.status = confirm
        return null
      })
    }
    return (
      <Table
        columns={columns}
        dataSource={transactionList}
        rowKey="hash"
        scroll={{ x: 1300 }}
        sticky
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactionList: state.blockTransaction,
    confirm: state.block.confirm,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  TransactionTable
)

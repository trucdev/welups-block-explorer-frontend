import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { Div, StyledLink } from './style'

const columns = [
  {
    title: 'No.',
    key: 'no',
    render: (value, item, index) => index + 1,
    fixed: 'left',
    width: 70,
  },
  {
    title: 'Token',
    dataIndex: 'token',
    key: 'token',
    render: (record) => (
      <StyledLink key={record} to={'/token/' + record} target="_blank">
        {record}
      </StyledLink>
    ),
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  },
]

class TokenBalance extends Component {
  render() {
    let { contract } = this.props
    var entries = contract.assets ? Object.entries(contract.assets) : null
    var newTest = []
    if (entries) {
      Array.from(entries, (val, ind) => {
        var item = {}
        Array.from(val, (value, index) => {
          index === 0 ? (item.token = value) : (item.balance = value)
          return null
        })
        newTest.push(item)
        return null
      })
    }
    return (
      <div>
        <Div>
          <span>A Total of</span> {newTest ? newTest.length : null} <span>Tokens</span>
        </Div>
        <Table columns={columns} dataSource={newTest} rowKey="token" scroll={{ x: 1300 }} sticky />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(TokenBalance)

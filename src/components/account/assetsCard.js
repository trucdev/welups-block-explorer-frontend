import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Table } from 'antd'
import { currencyFormat } from '../../utils/utils'
import PageHeader from '../partials/pageHeader'

class AssetsCard extends Component {
  render() {
    let i = 1
    const data = []
    for (let key in this.props.account.asset) {
      data.push({
        key: i,
        num: i,
        asset: key,
        value: this.props.account.asset[key],
      })
      i++
    }
    const columns = [
      {
        title: 'No.',
        dataIndex: 'num',
      },
      {
        title: 'Asset',
        dataIndex: 'asset',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        render: (record) => {
          return currencyFormat(record)
        },
      },
    ]
    return (
      <div>
        <PageHeader>Asset</PageHeader>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AssetsCard)

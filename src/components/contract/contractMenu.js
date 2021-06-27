import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import ContractCodeMenu from './contractCodeMenu'
import TokenBalance from './tokenBalance'

class ContractMenu extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="2" type="card">
        <Tabs.TabPane tab="TOKEN BALANCE" key="1">
          <TokenBalance />
        </Tabs.TabPane>
        <Tabs.TabPane tab="CONTRACT" key="2">
          <ContractCodeMenu />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  ContractMenu
)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Select, notification } from 'antd'
import ContractCode from './contractCode'
import ReadContract from './readContract'
import WriteContract from './writeContract'
import { Wrapper, Div } from './style'
import { updatePriKey } from '../../actions/contract'
import styled from 'styled-components'

const { Option } = Select

const StyleSelect = styled(Select)`
  width: 200px;
`

class ContractCodeMenu extends Component {
  componentDidUpdate() {
    var { prikeys } = this.props
    if (!prikeys.prikeys || prikeys.prikeys.length === 0) {
      notification.warning({
        message: 'Warning!',
        description:
          'You have no private key, please add somes in private key management to perform transaction!',
      })
    }
  }

  onChange = (value) => {
    this.props.updatePriKey(value)
  }

  render() {
    let { contract, prikeys } = this.props
    var noRead = 0
    var noWrite = 0
    var read = contract.abi
      ? contract.abi.map((func, index) => {
          if (
            !func.stateMutability ||
            func.stateMutability === 0 ||
            func.stateMutability === 1 ||
            func.stateMutability === 2
          ) {
            noRead++
            return (
              <ReadContract key={index} func={func} no={noRead} addr={contract.contract_address} />
            )
          }
          return null
        })
      : null
    var write = contract.abi
      ? contract.abi.map((func, index) => {
          if (func.stateMutability === 4 || func.stateMutability === 3) {
            noWrite++
            return (
              <WriteContract
                key={index}
                func={func}
                no={noWrite}
                addr={contract.contract_address}
              />
            )
          }
          return null
        })
      : null
    return (
      <Wrapper>
        <Div>
          <Tabs defaultActiveKey="1" type="card">
            <Tabs.TabPane tab="Code" key="1">
              <ContractCode />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read Contract" key="2">
              <Wrapper>
                <StyleSelect
                  showSearch
                  placeholder="Select a private key"
                  allowClear
                  onChange={this.onChange}
                >
                  {prikeys.prikeys && prikeys.prikeys.length !== 0
                    ? prikeys.prikeys.map((value, index) => (
                        <Option value={value.prikey} key={index}>
                          {value.name}
                        </Option>
                      ))
                    : null}
                </StyleSelect>
              </Wrapper>
              {read}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Write Contract" key="3">
              <Wrapper>
                <StyleSelect
                  showSearch
                  placeholder="Select a private key"
                  allowClear
                  onChange={this.onChange}
                >
                  {prikeys.prikeys && prikeys.prikeys.length !== 0
                    ? prikeys.prikeys.map((value, index) => (
                        <Option value={value.prikey} key={index}>
                          {value.name}
                        </Option>
                      ))
                    : null}
                </StyleSelect>
              </Wrapper>
              {write}
            </Tabs.TabPane>
          </Tabs>
        </Div>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
    prikeys: state.prikeyManagement,
    login: state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePriKey: (key) => {
      dispatch(updatePriKey(key))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  ContractCodeMenu
)

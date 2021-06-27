import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { FuncWrapper, FuncName, FuncBody, Result, Root } from './style'
import FormInputs from './formInputs'
import { triggerSmartContract, CONTRACT_WRITE } from '../../actions/contract'
import { Link } from 'react-router-dom'
import { GLOBAL_SYMBOL } from '../../constant'

class WriteContract extends Component {
  triggerSmartContract = async (values) => {
    var { func, addr, contract, no } = this.props
    var amount = values.acgSend ? parseInt(values.acgSend) : 0
    var params = []
    var jsonString = []
    Object.keys(values).map((key, index) => {
      if (key !== 'acgSend') {
        let param = values[key]
        if (func.inputs[index].type === 'bool') {
          if (values[key] === 'true' || values[key] === '1') {
            param = true
          } else if (values[key] === 'false' || values[key] === '0') {
            param = false
          }
        }
        params.push(param)
      }
      return null
    })
    var method = func.name + '('
    if (func.inputs) {
      func.inputs.map((value, index) => {
        method += value.type + (index === func.inputs.length - 1 ? '' : ',')
        jsonString.push({ [value.type]: params[index] })
      })
    }
    method += ')'
    this.props.triggerSmartContract(
      no,
      contract.prikey,
      addr,
      method,
      jsonString,
      func.outputs,
      CONTRACT_WRITE,
      amount
    )
  }

  render() {
    var { func, no, contract } = this.props
    var form = func.inputs
      ? func.inputs.map((inp, index) => {
          return <FormInputs key={index} inp={inp} ind={index} />
        })
      : null
    return (
      <FuncWrapper>
        <FuncName>{no + '. ' + func.name}</FuncName>
        <FuncBody>
          <Form name={'func' + no} onFinish={this.triggerSmartContract}>
            {form}
            {func.stateMutability === 4 ? (
              <Form.Item name="acgSend">
                <Input placeholder={GLOBAL_SYMBOL + ' send amount'} />
              </Form.Item>
            ) : null}
            <Form.Item>
              <Button htmlType="submit">Call</Button>
            </Form.Item>
          </Form>
          {contract.result &&
          contract.result.no === no &&
          contract.result.type === CONTRACT_WRITE ? (
            <Result>
              <Root>{'Result: '}</Root>
              {'Transaction ID: '}
              <Link to={'/transaction/' + contract.result.tran_id} target="_blank">
                {contract.result.tran_id}
              </Link>
              {'  Status:' + contract.result.status}
            </Result>
          ) : null}
        </FuncBody>
      </FuncWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    triggerSmartContract: (no, prikey, addr, method, jsonString, outputs, type, amount) => {
      dispatch(triggerSmartContract(no, prikey, addr, method, jsonString, outputs, type, amount))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  WriteContract
)

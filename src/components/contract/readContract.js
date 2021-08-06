import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'antd'
import { Wrapper, FuncName, FuncBody, Result, Root } from './style'
import FormInputs from './formInputs'
import { triggerSmartContract, CONTRACT_READ } from '../../actions/contract'

class ReadContract extends Component {
  onFinish = (values) => {
    var { func, addr, contract, no } = this.props
    var params = Object.keys(values).map((key) => values[key])
    var method = func.name + '('
    var jsonString = []
    if (func.inputs) {
      func.inputs.map((value, index) => {
        method += value.type + (index === func.inputs.length - 1 ? '' : ',')
        jsonString.push({ [value.type]: params[index] })
        return null
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
      CONTRACT_READ
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
      <Wrapper>
        <FuncName>{no + '. ' + func.name}</FuncName>
        <FuncBody>
          <Form name={'func' + no} onFinish={this.onFinish}>
            {form}
            <Form.Item>
              <Button htmlType="submit">Call</Button>
            </Form.Item>
          </Form>
          {contract.result &&
          contract.result.data &&
          contract.result.no === no &&
          contract.result.type === CONTRACT_READ ? (
            <Result>
              <Root>{'Result: '}</Root>
              {contract.result.data.toString()}
            </Result>
          ) : null}
        </FuncBody>
      </Wrapper>
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
    triggerSmartContract: (no, prikey, addr, method, jsonString, outputs, type) => {
      dispatch(triggerSmartContract(no, prikey, addr, method, jsonString, outputs, type))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  ReadContract
)

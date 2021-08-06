import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { Div, Right, TextBox, Wrapper } from './style'
import { SettingOutlined, CopyOutlined, FileOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class ContractCode extends Component {
  render() {
    let { contract } = this.props
    return (
      <Wrapper>
        <Row gutter={[20, 20]}>
          <Col span={6}>
            <SettingOutlined /> Contract ABI
          </Col>
          <Col span={18}>
            <Right>
              <CopyToClipboard text={contract.abi ? JSON.stringify(contract.abi) : null}>
                <CopyOutlined />
              </CopyToClipboard>
            </Right>
          </Col>
        </Row>
        <TextBox rows={7} value={contract.abi ? JSON.stringify(contract.abi) : null} disabled />
        <Row>
          <Col span={6}>
            <FileOutlined />
            &nbsp;Byte codes
          </Col>
          <Col span={18}>
            <Right>
              <CopyToClipboard text={contract.bytecode}>
                <CopyOutlined />
              </CopyToClipboard>
            </Right>
          </Col>
        </Row>
        <TextBox rows={7} value={contract.bytecode} disabled />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(ContractCode)

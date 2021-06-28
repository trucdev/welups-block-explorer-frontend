import React, { Component } from 'react'
import BlockList from './block'
import TransactionList from './transaction'
import Summary from './summary'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

class Home extends Component {
  render() {
    return (
      <div>
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Summary />
          </Col>
        </Row>
        <Row gutter={[5, 5]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            {' '}
            <BlockList></BlockList>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            {' '}
            <TransactionList></TransactionList>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(Home)

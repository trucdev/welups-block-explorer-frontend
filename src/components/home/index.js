import React, { Component } from 'react'
import BlockList from './block'
import TransactionList from './transaction'
import Summary from './summary'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import styled from 'styled-components'

const HomeContainer = styled(Col)`
  margin-bottom: 25px;
`

class Home extends Component {
  render() {
    return (
      <HomeContainer xs={22} sm={20} md={20} lg={19} xl={18}>
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Summary />
          </Col>
        </Row>
        <Row gutter={[25, 25]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            {' '}
            <BlockList></BlockList>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            {' '}
            <TransactionList></TransactionList>
          </Col>
        </Row>
      </HomeContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(Home)

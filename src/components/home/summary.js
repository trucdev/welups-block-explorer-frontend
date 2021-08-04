import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadSystemState } from '../../actions/home'
import styled from 'styled-components'
import { Card, Row, Col } from 'antd'
import SummaryItem from './summaryItem'
import Grid from 'antd/lib/card/Grid'

//Styled components
const SummaryCard = styled(Card)`
  padding: 0;
  .ant-card-body {
    padding: 0;
  }
  margin-bottom: 25px;
  box-shadow: 0px 2px 5px #0000000f;
  border: 1px solid #e4e9ec;
  border-radius: 10px;
`

class SummaryBar extends Component {
  componentDidMount() {
    this.props.loadSystemState()
  }
  render() {
    return (
      <SummaryCard>
        <Row>
          <Col span={24} lg={8}>
            <SummaryItem
              icon="/images/blockchain.svg"
              title="Block Height"
              value={this.props.systemState.block_height}
            />
          </Col>
          <Col span={24} lg={8}>
            <SummaryItem
              icon="/images/tokens.svg"
              title="WRC10 Tokens"
              value={this.props.systemState.asset_num}
            />
          </Col>
          <Col span={24} lg={8}>
            <SummaryItem
              last
              icon="/images/node.svg"
              title="Total Nodes"
              value={this.props.systemState.total_nodes}
            />
          </Col>
        </Row>
      </SummaryCard>
    )
  }
}
// export default SummaryBar;
const mapStateToProps = (state) => {
  return {
    systemState: state.system.systemState,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadSystemState: () => {
      dispatch(loadSystemState())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SummaryBar)

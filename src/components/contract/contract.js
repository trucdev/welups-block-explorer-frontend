import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../../actions/contract'
import { Row, Col } from 'antd'
import { Table, BorderRed, Div, FontFamily, Title } from './style'
import ContractAddress from './contractAddress'
import ContractOverview from './contractOverview'
import ContractInformation from './contractInformation'
import ContractMenu from './contractMenu'
import PageHeader from './../partials/pageHeader'
import CardShadow from './../partials/cardShadow'
import EmptySpace from './../partials/emptySpace'

class Contract extends Component {
  componentDidMount() {
    var id = this.props.match.params.id
    this.props.loadContract(id)
  }

  render() {
    return (
      <>
        <PageHeader>Contract</PageHeader>
        <CardShadow>
          <ContractAddress />
          <Div>
            <Col span={11}>
              <Title>Contract Overview</Title>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Title>Information</Title>
            </Col>
          </Div>
          <Div>
            <Col span={11}>
              <Table>
                <ContractOverview />
              </Table>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Table>
                <ContractInformation />
              </Table>
            </Col>
          </Div>
          <ContractMenu />
        </CardShadow>
        <EmptySpace />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    loadContract: (addr) => {
      dispatch(action.loadContractApi(addr))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Contract)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddressCard from './card'
import styled from 'styled-components'
import AssetsCard from './assetsCard'
import PageHeader from '../partials/pageHeader'

const Container = styled.div`
  margin: 5px;
`
const CardAccountInfo = styled.div`
  box-shadow: 0px 3px 5px #00000014;
  border: 1px solid #e7eaf3;
  border-radius: 10px;
  overflow: hidden;
`
class AccountDetails extends Component {
  render() {
    return (
      <Container>
        <PageHeader>ACCOUNT DETAILS</PageHeader>
        <CardAccountInfo>
          <AddressCard addr={this.props.match.params.id} />
        </CardAccountInfo>
        <AssetsCard />
      </Container>
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
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  AccountDetails
)

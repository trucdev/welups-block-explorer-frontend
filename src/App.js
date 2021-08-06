import React, { Component } from 'react'

import { Button, Col, Form, Input, Modal, Result, Row } from 'antd'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import Inspect from 'inspx'

import { loadFromStorage, logout } from './actions/login'
import Account from './api/account'
import AccountDetails from './components/account'
import AssetManagement from './components/assetManagement/index'
import BlockDetail from './components/block/block'
import BlockTable from './components/blocks/index'
import ContractDetails from './components/contract/contract'
import ContractTable from './components/contracts/index'
import DeployContract from './components/deployContract/index'
import FooterComponent from './components/footer'
import FreezeBalance from './components/freezeBalance/index'
import Home from './components/home'
import IssueTokenTRC10 from './components/issueTokenTRC10/index'
import Login from './components/login/index'
import MainNavigation from './components/mainNavigation'
import NodeTable from './components/nodes/index'
import NotFound from './components/not-found'
import PriKeyManagement from './components/prikeyManagement/index'
import ResetPassword from './components/resetPassword/index'
import NewPassword from './components/resetPassword/newpassword'
import Search from './components/search'
import ActivateAccount from './components/signup/activate'
import SignUp from './components/signup/signup'
import TokenDetails from './components/token/index'
import TokenTable from './components/tokens/index'
import TransactionDetails from './components/transaction'
import TransactionsList from './components/transactions/transactionsList'
import TransferAsset from './components/transferasset'
import WitnessTable from './components/witnesses'
import { addressToHex } from './utils/utils'
import Body from './components/body'
import ScrollToTop from './components/scroll/scrollToTop'

const AppWrapper = styled.div`
  flex: 1 0 auto;
  :before {
    display: block;
    position: absolute;
    top: 79px;
    width: 100%;
    height: ${({ bgHeight }) => bgHeight || 190}px;
    z-index: -1;
    content: ' ';
    background-image: url(/images/bg-top.png);
    background-repeat: no-repeat;
  }
`

const ContentRowWrapper = styled(Row)`
  padding-top: 40px;
`

const DecodeResultDiv = styled.div`
  word-break: break-word;
  margin-top: 10px;
  font-style: ${(props) => (props.error ? 'normal' : 'italic')};
  color: ${(props) => (props.error ? '#e50915' : 'rgb(0, 189, 12)')};
`

function RouteWithBody({ ...props }) {
  return (
    <Body>
      <Route {...props} />
    </Body>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      isModalDecodeVisible: false,
      newAddr: '',
      newPrivKey: '',
      password: '',
      decodeResult: { value: '', error: false },
    }
  }

  logOut = () => {
    this.props.logout()
    return <Redirect to="/login" />
  }
  generateAccount = () => {
    const newAcc = Account.createAccount()
    this.setState({
      isModalVisible: true,
      newAddr: newAcc.address,
      newPrivKey: newAcc.privateKey,
      password: newAcc.password,
    })
  }
  onOk = () => {
    this.setState({
      isModalVisible: false,
      isModalDecodeVisible: false,
      newAddr: '',
      newPrivKey: '',
      password: '',
      decodeResult: { value: '', error: false },
    })
  }
  handleDecodeAddressMenuClick = () => {
    this.setState({
      isModalDecodeVisible: true,
    })
  }
  handleDecodeAddress = (value) => {
    const res = addressToHex(value.address)
    if (res) {
      this.setState({ decodeResult: { value: res, error: false } })
    } else {
      this.setState({
        decodeResult: { value: 'Invalid address! Please try again!', error: true },
      })
    }
  }
  componentDidMount() {
    let { login } = this.props
    if (login.token === '') {
      this.props.loadFromStorage()
    }
  }
  render() {
    var { login } = this.props
    const { decodeResult } = this.state

    return (
      <Inspect className="xxx" disabled={process.env.NODE_ENV === 'production'}>
        <Router>
          <ScrollToTop />
          <Modal
            title="New address"
            centered
            visible={this.state.isModalVisible}
            onOk={this.onOk}
            onCancel={this.onOk}
          >
            <Result
              status="success"
              title={`Your address: ${this.state.newAddr}`}
              subTitle={`Your privatekey: ${this.state.newPrivKey}`}
            />
          </Modal>
          <Modal
            title="Decode Address"
            centered
            visible={this.state.isModalDecodeVisible}
            onCancel={this.onOk}
            footer={null}
            destroyOnClose
          >
            <Form
              layout="vertical"
              name="decodeAddress"
              size="medium"
              onFinish={this.handleDecodeAddress}
            >
              <Form.Item
                label="Input addess"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your address here!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Row>
                <Col>
                  <Button htmlType="submit" type="primary">
                    Done
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col>
                  <Button key="back" onClick={this.onOk}>
                    Cancel
                  </Button>
                </Col>
              </Row>
              {decodeResult.value && (
                <DecodeResultDiv error={decodeResult.error}>{decodeResult.value}</DecodeResultDiv>
              )}
            </Form>
          </Modal>
          <AppWrapper>
            <MainNavigation
              login={login}
              logOut={this.logOut}
              generateAccount={this.generateAccount}
              handleDecodeAddressMenuClick={this.handleDecodeAddressMenuClick}
            />
            <ContentRowWrapper justify="center" gutter={[0, 0]}>
              <Col xs={20} sm={20} md={20} lg={19} xl={18}>
                <Row gutter={[5, 5]}>
                  <Col span={24}>
                    <Search />
                  </Col>
                </Row>
              </Col>
              <Switch>
                <Route exact path="/home" render={() => <Home />} />
                <RouteWithBody path="/signup" render={(routeProps) => <SignUp {...routeProps} />} />
                <RouteWithBody
                  path="/activate-account"
                  render={(routeProps) => <ActivateAccount {...routeProps} />}
                />
                <RouteWithBody exact path="/witness" render={() => <WitnessTable />} />
                <RouteWithBody
                  path="/block/:id"
                  render={(routeProps) => <BlockDetail {...routeProps} />}
                />
                <RouteWithBody path="/notfound" render={() => <NotFound />} />
                <RouteWithBody exact path="/" render={() => <Redirect to="/home" />} />
                <RouteWithBody
                  path="/transaction/:id"
                  render={(routeProps) => <TransactionDetails {...routeProps} />}
                />
                <RouteWithBody
                  path="/user/transferasset"
                  render={(routeProps) => <TransferAsset {...routeProps} />}
                />
                <RouteWithBody
                  path="/account/:id"
                  render={(routeProps) => <AccountDetails {...routeProps} />}
                />
                <RouteWithBody
                  path="/token/:id"
                  render={(routeProps) => <TokenDetails {...routeProps} />}
                />
                <RouteWithBody
                  path="/contract/:id"
                  render={(routeProps) => <ContractDetails {...routeProps} />}
                />
                <RouteWithBody
                  path="/transactions"
                  render={(routeProps) => <TransactionsList {...routeProps} />}
                />
                <RouteWithBody
                  path="/blocks"
                  render={(routeProps) => <BlockTable {...routeProps} />}
                />
                <RouteWithBody path="/tokens" render={() => <TokenTable />} />
                <RouteWithBody path="/nodes" render={() => <NodeTable />} />
                <RouteWithBody path="/user/issue-token-trc10" render={() => <IssueTokenTRC10 />} />
                <RouteWithBody exact path="/login" render={() => <Login />} />
                <RouteWithBody exact path="/user" render={() => <AssetManagement />} />
                <RouteWithBody path="/user/freeze-balance" render={() => <FreezeBalance />} />
                <RouteWithBody path="/user/deploycontract" render={() => <DeployContract />} />
                <RouteWithBody path="/resetpassword" render={() => <ResetPassword />} />
                <RouteWithBody path="/newpassword" render={() => <NewPassword />} />
                <RouteWithBody path="/prikey-management" render={() => <PriKeyManagement />} />
                <RouteWithBody path="/contracts" render={() => <ContractTable />} />
                <Redirect to="/notfound" />
              </Switch>
            </ContentRowWrapper>
          </AppWrapper>
          <FooterComponent />
        </Router>
      </Inspect>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    },
    loadFromStorage: () => {
      dispatch(loadFromStorage())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(App)

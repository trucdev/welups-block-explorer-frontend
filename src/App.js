import {
  AppstoreOutlined,
  BlockOutlined,
  DeploymentUnitOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  KeyOutlined,
  LogoutOutlined,
  MailOutlined,
  MoneyCollectOutlined,
  NodeIndexOutlined,
  PlusCircleOutlined,
  SendOutlined,
  SplitCellsOutlined,
  TransactionOutlined,
  WalletOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { Col, Layout, Menu, Modal, Result, Row, Input, Form, Button } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { loadFromStorage, logout } from './actions/login'
import Account from './api/account'
import AccountDetails from './components/account'
import AssetManagement from './components/assetManagement/index'
import BlockDetail from './components/block/block'
import BlockTable from './components/blocks/index'
import ContractDetails from './components/contract/contract'
import ContractTable from './components/contracts/index'
import DeployContract from './components/deployContract/index'
import FreezeBalance from './components/freezeBalance/index'
import Home from './components/home'
import IssueTokenTRC10 from './components/issueTokenTRC10/index'
import Login from './components/login/index'
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
import FooterComponent from './components/footer'
import WitnessTable from './components/witnesses'
import { addressToHex } from './utils/utils'
import MainNavigation from './components/mainNavigation'

const AppWrapper = styled.div`
  min-height: 800px;
  text-align: center;
  flex: 1 0 auto;
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
      <Router>
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
            <Col xs={20} sm={20} md={20} lg={19} xl={18} style={{ backgroundColor: '#fafafa' }}>
              <Row gutter={[5, 5]}>
                <Col span={24}>
                  <Search />
                </Col>
              </Row>
              <Switch>
                <Route exact path="/home" render={() => <Home />} />
                <Route path="/signup" render={(routeProps) => <SignUp {...routeProps} />} />
                <Route
                  path="/activate-account"
                  render={(routeProps) => <ActivateAccount {...routeProps} />}
                />
                <Route exact path="/witness" render={() => <WitnessTable />} />
                <Route path="/block/:id" render={(routeProps) => <BlockDetail {...routeProps} />} />
                <Route path="/notfound" render={() => <NotFound />} />
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route
                  path="/transaction/:id"
                  render={(routeProps) => <TransactionDetails {...routeProps} />}
                />
                <Route
                  path="/user/transferasset"
                  render={(routeProps) => <TransferAsset {...routeProps} />}
                />
                <Route
                  path="/account/:id"
                  render={(routeProps) => <AccountDetails {...routeProps} />}
                />
                <Route
                  path="/token/:id"
                  render={(routeProps) => <TokenDetails {...routeProps} />}
                />
                <Route
                  path="/contract/:id"
                  render={(routeProps) => <ContractDetails {...routeProps} />}
                />
                <Route
                  path="/transactions"
                  render={(routeProps) => <TransactionsList {...routeProps} />}
                />
                <Route path="/blocks" render={(routeProps) => <BlockTable {...routeProps} />} />
                <Route path="/tokens" render={() => <TokenTable />} />
                <Route path="/nodes" render={() => <NodeTable />} />
                <Route path="/user/issue-token-trc10" render={() => <IssueTokenTRC10 />} />
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/user" render={() => <AssetManagement />} />
                <Route path="/user/freeze-balance" render={() => <FreezeBalance />} />
                <Route path="/user/deploycontract" render={() => <DeployContract />} />
                <Route path="/resetpassword" render={() => <ResetPassword />} />
                <Route path="/newpassword" render={() => <NewPassword />} />
                <Route path="/prikey-management" render={() => <PriKeyManagement />} />
                <Route path="/contracts" render={() => <ContractTable />} />
                <Redirect to="/notfound" />
              </Switch>
            </Col>
          </ContentRowWrapper>
        </AppWrapper>
        <FooterComponent />
      </Router>
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

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
} from '@ant-design/icons'
import { Col, Layout, Menu, Modal, Result, Row } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
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
import WitnessTable from './components/witnesses'
import WUelupsLogo from './assets/images/WUelupsLogo.png'
const { Footer } = Layout

const AppWrapper = styled.div`
  min-height: 800px;
  text-align: center;
  flex: 1 0 auto;
`
const Logo = styled.img`
  height: 40px;
  width: 140px;
`
const ContentRowWrapper = styled(Row)`
  padding-top: 40px;
`
const FooterWrapper = styled(Footer)`
  text-align: center;
  flex-shrink: 0;
`
const RightMenuItem = styled(Menu.Item)`
  float: right;
`
const MenuItemStyled = styled(Menu.Item)`
  white-space: normal;
  height: auto !important;
`
const { SubMenu } = Menu
const RightSubMenuItem = styled(SubMenu)`
  float: right;
`
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
      newAddr: '',
      newPrivKey: '',
      password: '',
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
      newAddr: '',
      newPrivKey: '',
      password: '',
    })
  }
  componentDidMount() {
    let { login } = this.props
    if (login.token === '') {
      this.props.loadFromStorage()
    }
  }
  render() {
    var { login } = this.props
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
        <AppWrapper>
          <Menu mode="horizontal">
            <Menu.Item disabled={true}>
              <Logo src={WUelupsLogo} />
            </Menu.Item>
            {login.token !== '' ? (
              <RightSubMenuItem title={login.email}>
                <Menu.Item key="User" icon={<WalletOutlined />}>
                  <Link to="/user">Assets</Link>
                </Menu.Item>
                <Menu.Item key="transfer" icon={<SendOutlined />}>
                  <Link to="/user/transferasset">Send</Link>
                </Menu.Item>
                <Menu.Item key="issueTokenTRC10" icon={<MoneyCollectOutlined />}>
                  <Link to="/user/issue-token-trc10">Issue WRC10</Link>
                </Menu.Item>
                <Menu.Item key="deployContract" icon={<DeploymentUnitOutlined />}>
                  <Link to="/user/deploycontract">Deploy Contract</Link>
                </Menu.Item>
                <Menu.Item key="freezeBalance" icon={<SplitCellsOutlined />}>
                  <Link to="/user/freeze-balance">Freeze Balance</Link>
                </Menu.Item>
                <Menu.Item key="prikeyManagement" icon={<KeyOutlined />}>
                  <Link to="/prikey-management">Private Management</Link>
                </Menu.Item>
                <Menu.Item key="logOut" icon={<LogoutOutlined />}>
                  <Link to="/login" onClick={this.logOut}>
                    Log out
                  </Link>
                </Menu.Item>
              </RightSubMenuItem>
            ) : (
              <RightMenuItem key="login">
                <Link to="/login">Register/Login</Link>
              </RightMenuItem>
            )}
            <Menu.Item key="home" icon={<MailOutlined />}>
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="witness" icon={<AppstoreOutlined />}>
              <Link to="/witness">Witnesses</Link>
            </Menu.Item>
            <Menu.Item key="blocks" icon={<BlockOutlined />}>
              <Link to="/blocks">Blocks</Link>
            </Menu.Item>
            <Menu.Item key="nodes" icon={<NodeIndexOutlined />}>
              <Link to="/nodes">Nodes</Link>
            </Menu.Item>
            <Menu.Item key="transactions" icon={<TransactionOutlined />}>
              <Link to="/transactions">Transactions</Link>
            </Menu.Item>
            <Menu.Item key="tokens" icon={<DollarCircleOutlined />}>
              <Link to="/tokens">WRC10 Tokens</Link>
            </Menu.Item>
            <Menu.Item key="contracts" icon={<FileTextOutlined />}>
              <Link to="/contracts">WRC20 Contracts</Link>
            </Menu.Item>
            <MenuItemStyled
              key="generateAddress"
              icon={<PlusCircleOutlined />}
              onClick={this.generateAccount}
            >
              <Link>Generate Account</Link>
            </MenuItemStyled>
          </Menu>
          <ContentRowWrapper justify="center" gutter={[0, 0]}>
            <Col xs={20} sm={20} md={20} lg={19} xl={18}>
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
        <FooterWrapper>Designed by Welups</FooterWrapper>
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

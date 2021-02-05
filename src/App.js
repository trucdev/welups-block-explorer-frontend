import React, { Component } from 'react';
import { Menu, Layout, Result } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  NodeIndexOutlined,
  BlockOutlined,
  TransactionOutlined,
  DollarCircleOutlined,
  SendOutlined,
  MoneyCollectOutlined,
  WalletOutlined,
  LogoutOutlined,
  KeyOutlined,
  DeploymentUnitOutlined,
  SplitCellsOutlined
} from '@ant-design/icons';
import Home from './components/home';
import BlockDetail from './components/block/block';
import NotFound from './components/not-found';
import Search from './components/search';
import TransactionDetails from './components/transaction';
import TransactionsList from './components/transactions/transactionsList';
import AccountDetails from './components/account';
import ContractDetails from './components/contract/contract';
import WitnessTable from './components/witnesses';
import TokenTable from './components/tokens/index';
import NodeTable from './components/nodes/index';
import BlockTable from './components/blocks/index';
import TokenDetails from './components/token/index';
import IssueTokenTRC10 from './components/issueTokenTRC10/index';
import TransferAsset from './components/transferasset';
import SignUp from './components/signup/signup';
import Login from './components/login/index';
import AssetManagement from './components/assetManagement/index';
import FreezeBalance from './components/freezeBalance/index';
import DeployContract from './components/deployContract/index';
import { Row, Col, Modal } from 'antd';
import {
  BrowserRouter as Router,
  Route, Link, Redirect, Switch
} from "react-router-dom";
import styled from 'styled-components';
import { connect } from 'react-redux';
import ACLogo from './assets/images/ACLogo.png';
import { reset } from './actions/login';
import Account from './api/account';
const { Footer } = Layout;

const AppWrapper = styled.div`
  min-height: 800px;
  text-align: center;
  flex: 1 0 auto;
`;
const Logo = styled.img`
    height: 36px;
    width: 30px;
`;
const ContentRowWrapper = styled(Row)`
  padding-top:40px;
`;
const FooterWrapper = styled(Footer)`
  text-align: center;
  flex-shrink: 0;
`;
const StyledMenuRight = styled(Menu)`
    width: 70%;
`;
const StyledMenuLeft = styled(Menu)`
    width: 30%;
    text-align: center;
`;
const MenuContainer = styled.div`
    display: flex;
`;
const { SubMenu } = Menu;
const StyledSubMenu = styled(SubMenu)`
    margin-left:0;
`;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      newAddr: "",
      newPrivKey: "",
      password: "",
    }
  }

  logOut = () => {
    this.props.reset();
    return <Redirect to="/login" />
  }
  generateAccount = () => {
    const newAcc = Account.createAccount();
    this.setState({
      isModalVisible: true,
      newAddr: newAcc.address,
      newPrivKey: newAcc.privateKey,
      password: newAcc.password,
    });
  }
  onOk = () => {
    this.setState({
      isModalVisible: false,
      newAddr: "",
      newPrivKey: "",
      password: "",
    });
  }
  render() {
    var { login } = this.props;
    return (
      <Router>
        <Modal title="New address" centered visible={this.state.isModalVisible} onOk={this.onOk} onCancel={this.onOk}>
          <Result
            status="success"
            title={`Your address: ${this.state.newAddr}`}
            subTitle={`Your privatekey: ${this.state.newPrivKey}`}
          />
        </Modal>
        <AppWrapper>
          <MenuContainer>
            <StyledMenuRight mode="horizontal">
              <Menu.Item disabled={true}>
                <Logo src={ACLogo} />
              </Menu.Item>
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
                <Link to="/tokens">Tokens</Link>
              </Menu.Item>
            </StyledMenuRight>
            <StyledMenuLeft mode="horizontal">
              {
                login.token !== "" ?
                  <StyledSubMenu title={login.email}>
                    <Menu.Item key="User" icon={<WalletOutlined />}>
                      <Link to="/user">Assets</Link>
                    </Menu.Item>
                    <Menu.Item key="transfer" icon={<SendOutlined />}>
                      <Link to="/transferasset">Send</Link>
                    </Menu.Item>
                    <Menu.Item key="issueTokenTRC10" icon={<MoneyCollectOutlined />}>
                      <Link to="/issue-token-trc10">Issue TRC10</Link>
                    </Menu.Item>
                    <Menu.Item key="generateAddress" icon={<KeyOutlined />} onClick={this.generateAccount}>
                      Generate Account
                    </Menu.Item>
                    <Menu.Item key="deployContract" icon={<DeploymentUnitOutlined />}>
                      <Link to="/deploycontract" >Deploy Contract</Link>
                    </Menu.Item>
                    <Menu.Item key="freezeBalance" icon={<SplitCellsOutlined />}>
                      <Link to="/freeze-balance" >Freeze Balance</Link>
                    </Menu.Item>
                    <Menu.Item key="logOut" icon={<LogoutOutlined />}>
                      <Link to="/login" onClick={this.logOut}>Log out</Link>
                    </Menu.Item>
                  </StyledSubMenu>
                  : <Menu.Item key="login" >
                    <Link to="/login">Register/Login</Link>
                  </Menu.Item>
              }
            </StyledMenuLeft>
          </MenuContainer>
          <ContentRowWrapper justify='center' gutter={[5, 5]}>
            <Col xs={20} sm={20} md={20} lg={19} xl={18}>
              <Row gutter={[5, 5]}>
                <Col span={24} ><Search /></Col>
              </Row>
              <Switch>
                <Route
                  exact
                  path="/home"
                  render={() => <Home />}
                />
                <Route
                  path="/signup"
                  render={(routeProps) => <SignUp {...routeProps} />}
                />
                <Route
                  exact
                  path="/witness"
                  render={() => <WitnessTable />}
                />
                <Route
                  path="/block/:id"
                  render={(routeProps) => <BlockDetail {...routeProps} />}
                />
                <Route
                  path="/notfound"
                  render={() => <NotFound />}
                />
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/home" />}
                />
                <Route
                  path="/transaction/:id"
                  render={(routeProps) => <TransactionDetails {...routeProps} />}
                />
                <Route
                  path="/transferasset"
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
                <Route
                  path="/blocks"
                  render={(routeProps) => <BlockTable {...routeProps} />}
                />
                <Route
                  path="/tokens"
                  render={() => <TokenTable />}
                />
                <Route
                  path="/nodes"
                  render={() => <NodeTable />}
                />
                <Route
                  path="/issue-token-trc10"
                  render={() => <IssueTokenTRC10 />}
                />
                <Route
                  path="/login"
                  render={() => <Login />}
                />
                <Route
                  path="/user"
                  render={() => <AssetManagement />}
                />
                <Route
                  path="/freeze-balance"
                  render={() => <FreezeBalance />}
                />
                <Route
                  path="/deploycontract"
                  render={() => <DeployContract />}
                />
                <Redirect to="/notfound" />
              </Switch>
            </Col>
          </ContentRowWrapper>
        </AppWrapper>
        <FooterWrapper>Designed by ACGroup</FooterWrapper>
      </Router>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
      dispatch(reset());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(App);
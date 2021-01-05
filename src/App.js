import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { MailOutlined, AppstoreOutlined, NodeIndexOutlined, BlockOutlined, TransactionOutlined, DollarCircleOutlined } from '@ant-design/icons';
import Home from './components/home';
import BlockDetail from './components/block/block';
import NotFound from './components/not-found';
import Search from './components/search';
import TransactionDetails from './components/transaction';
import AccountDetails from './components/account';
import ContractDetails from './components/contract/contract';
import WitnessTable from './components/witnesses';
import TokenTable from './components/tokens/index';
import NodeTable from './components/nodes/index';
import BlockTable from './components/blocks/index';
import TokenDetails from './components/token/index';
import { Row, Col } from 'antd';
import {
  BrowserRouter as Router,
  Route, Link, Redirect, Switch
} from "react-router-dom";
import styled from 'styled-components';
import { connect } from 'react-redux';
import ACLogo from './assets/images/ACLogo.png';
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
class App extends Component {
  render() {
    return (
      <Router>
        <AppWrapper>
          <Menu mode="horizontal">
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
            <Menu.Item key="tokens" icon={<DollarCircleOutlined />}>
              <Link to="/tokens">Tokens</Link>
            </Menu.Item>
            </Menu>
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
                  path="/blocks"
                  render={(routeProps) => <BlockTable {...routeProps} />}
                />
                <Route
                  path="/tokens"
                  render={(routeProps) => <TokenTable />}
                />
                <Route
                  path="/nodes"
                  render={(routeProps) => <NodeTable />}
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
export default connect(null, null, null, { forwardRef: true })(App);
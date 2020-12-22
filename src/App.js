import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import Home from './components/home';
import Witness from './components/witness';
import BlockDetail from './components/blocks/block';
import NotFound from './components/not-found';
import Search from './components/search';
import TransactionDetails from './components/transaction';
import AccountDetails from './components/account';
import ContractDetails from './components/account';
import WitnessTable from './components/witnesses';
import {
  BrowserRouter as Router,
  Route, Link, Redirect, Switch
} from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
const { Content, Footer } = Layout;


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu mode="horizontal">
            <Menu.Item key="home" icon={<MailOutlined />}>
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="witness" icon={<AppstoreOutlined />}>
              <Link to="/witness">Witnesses</Link>
            </Menu.Item>
            <Menu.Item key="blocks" icon={<AppstoreOutlined />}>
              <Link to="/blocks">Blocks</Link>
            </Menu.Item>
          </Menu>
          <Content className='home-content-wrapper' >
            <div className="site-layout-content">
              <div className='search-wrapper'><Search></Search></div>
              <Switch>
                <Route
                  exact
                  path="/home"
                  render={(routeProps) => <Home />}
                />
                <Route
                  exact
                  path="/witness"
                  render={(routeProps) => <WitnessTable />}
                />
                <Route
                  path="/block/:id"
                  render={(routeProps) => <BlockDetail {...routeProps}/>}
                />
                <Route
                  path="/notfound"
                  render={(routeProps) => <NotFound />}
                />
                <Route
                  exact
                  path="/"
                  render={(routeProps) => <Redirect to="/home" />}
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
                    path="/contract/:id"
                    render={(routeProps) => <ContractDetails {...routeProps} />}
                  />
                <Route
                  path="/blocks"
                  render={(routeProps) => <WitnessTable {...routeProps} />}
                />
              </Switch>
            </div>
          </Content>
          <Footer className='foot-wrapper'>Designed by ACGroup</Footer>
        </div>
      </Router>
    );
  }
}
export default connect(null, null, null, { forwardRef: true })(App);
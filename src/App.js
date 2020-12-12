import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import Home from './components/home/home';
import Witness from './components/witness';
import {
  BrowserRouter as Router,
  Route, Link
} from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import {chooseNewMainMenu} from './actions/app';
const { Content, Footer } = Layout;


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu onClick={this.props.chooseNewMainMenu} selectedKeys={this.props.mainMenu} mode="horizontal">
            <Menu.Item key="home" icon={<MailOutlined />}>
              <Link to={`home`}>Home</Link>
            </Menu.Item>
            <Menu.Item key="witness" icon={<AppstoreOutlined />}>
              <Link to={`/witness`}>Witnesses</Link>
            </Menu.Item>
          </Menu>
          <Content className='home-content-wrapper' >
            <div className="site-layout-content">
              <Route
                exact
                path="/"
                render={(routeProps) => <Home></Home>}
              />
              <Route
                path="/home"
                render={(routeProps) => <Home></Home>}
              />
              <Route
                path="/witness"
                render={(routeProps) => <Witness></Witness>}
              />
            </div>
          </Content>
          <Footer className='foot-wrapper'>Designed by ACGroup</Footer>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		mainMenu: state.app.mainMenu,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		chooseNewMainMenu: () => {
			dispatch(chooseNewMainMenu());
		},

	};
};
// export default connect(mapStateToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(App);
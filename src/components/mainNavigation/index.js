import React from 'react'
import {
  AppstoreOutlined,
  BlockOutlined,
  DeploymentUnitOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  KeyOutlined,
  LogoutOutlined,
  DownOutlined,
  MoneyCollectOutlined,
  NodeIndexOutlined,
  PlusCircleOutlined,
  SendOutlined,
  SplitCellsOutlined,
  TransactionOutlined,
  WalletOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import { Col, Menu, Row } from 'antd'
import { Link } from 'react-router-dom'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

const { SubMenu } = Menu

const Logo = styled.img`
  height: ${(height) => height || 40}px;
  width: ${(width) => width || 120}px;
`

const RightMenuItem = styled(({ last, ...props }) => <Menu.Item {...props} />)`
  float: right;
  padding-left: 10px !important;
  padding-right: 10px !important;
  span a {
    color: #74cfff !important;
  }
  ${({ last }) =>
    !last
      ? `
    position: relative;
    :before {
      content: ' ';
      display: block;
      position: absolute;
      right: 0;
      width: 1px;
      height: 10px;
      background: #74cfff;
      top: 36px;
    }
  `
      : ``}
`

const RightSubMenuItem = styled(SubMenu)`
  float: right;
`

const MenuItemStyled = styled(Menu.Item)`
  white-space: normal;
  height: auto !important;
`

const MainNavigationContainer = styled(Row)`
  background: #190f5d;
`

const LogoItem = styled(Menu.Item)`
  padding-left: 0 !important;
`

export default function MainNavigation({
  login,
  logOut,
  generateAccount,
  handleDecodeAddressMenuClick,
}) {
  const isLoggedIn = login.token !== ''

  const { xs } = useBreakpoint()

  return (
    <MainNavigationContainer justify="center" gutter={[0, 0]}>
      <Col xs={24} sm={20} md={20} lg={19} xl={18}>
        <Row wrap={false}>
          <Col flex="auto">
            <Menu mode="horizontal" theme="dark" overflowedIndicator="More">
              <LogoItem disabled={false} key="logo-home">
                <Link to="/">
                  <Logo src="/logo.png" width={xs ? 100 : 120} height={xs ? 35 : 40} />
                </Link>
              </LogoItem>
              {!xs ? (
                <Menu.Item key="home">
                  <Link to="/home">Home</Link>
                </Menu.Item>
              ) : null}
              <SubMenu
                key="blockchain-info"
                title={
                  <>
                    <span>Blockchain</span>
                    {/* <DownOutlined style={{ fontSize: 10 }} /> */}
                  </>
                }
              >
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
              </SubMenu>
              <SubMenu
                key="sub-menu-tokens"
                title={
                  <>
                    <span>Tokens</span>
                    {/* <DownOutlined style={{ fontSize: 10 }} /> */}
                  </>
                }
              >
                <Menu.Item key="tokens" icon={<DollarCircleOutlined />}>
                  <Link to="/tokens">WRC10 Tokens</Link>
                </Menu.Item>
                <Menu.Item key="contracts" icon={<FileTextOutlined />}>
                  <Link to="/contracts">Smart Contracts</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="tools"
                title={
                  <>
                    <span>Tools</span>
                    {/* <DownOutlined style={{ fontSize: 10 }} /> */}
                  </>
                }
              >
                <MenuItemStyled
                  key="generateAddress"
                  icon={<PlusCircleOutlined />}
                  onClick={generateAccount}
                >
                  Generate Account
                </MenuItemStyled>
                <MenuItemStyled
                  key="decodeAddress"
                  icon={<RedoOutlined />}
                  onClick={handleDecodeAddressMenuClick}
                >
                  Decode Address
                </MenuItemStyled>
              </SubMenu>
            </Menu>
          </Col>
          <Col flex="135px">
            <Menu mode="horizontal" theme="dark">
              {isLoggedIn ? (
                <RightSubMenuItem
                  title={`${login.email.substring(0, 10)}...`}
                  key="right-sub-menu-item"
                >
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
                    <Link to="/login" onClick={logOut}>
                      Log out
                    </Link>
                  </Menu.Item>
                </RightSubMenuItem>
              ) : (
                <>
                  <RightMenuItem key="signup">
                    <Link to="/signup">Register</Link>
                  </RightMenuItem>
                  <RightMenuItem key="login" last>
                    <Link to="/login">Login</Link>
                  </RightMenuItem>
                </>
              )}
            </Menu>
          </Col>
        </Row>
      </Col>
    </MainNavigationContainer>
  )
}

import React from 'react'
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
import styled from 'styled-components'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import WUelupsLogo from './../../assets/images/WUelupsLogo.png'

const { SubMenu } = Menu

const Logo = styled.img`
  height: 40px;
  width: 140px;
`

const RightMenuItem = styled(Menu.Item)`
  float: right;
`

const RightSubMenuItem = styled(SubMenu)`
  float: right;
`

const MenuItemStyled = styled(Menu.Item)`
  white-space: normal;
  height: auto !important;
`

export default function MainNavigation({
  login,
  logOut,
  generateAccount,
  handleDecodeAddressMenuClick,
}) {
  return (
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
            <Link to="/login" onClick={logOut}>
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
      <MenuItemStyled key="generateAddress" icon={<PlusCircleOutlined />} onClick={generateAccount}>
        Generate Account
      </MenuItemStyled>
      <MenuItemStyled
        key="decodeAddress"
        icon={<RedoOutlined />}
        onClick={handleDecodeAddressMenuClick}
      >
        Decode Address
      </MenuItemStyled>
    </Menu>
  )
}

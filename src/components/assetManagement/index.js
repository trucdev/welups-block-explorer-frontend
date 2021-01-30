import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { List, Row, Col, Modal, Input, Button } from 'antd';
import { currencyFormat } from '../../utils/utils';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { loadAssetApi, addAddrFromPrvkey } from '../../actions/assetManagement';
import { loadAccountDetails } from '../../actions/account';

const StyledLink = styled(Link)`
	&:link, &:visited {
		color: #c23631;
	}
`;
const ColHead = styled(Col)`
	font-weight: bold;
`;
const StyleRow = styled(Row)`
	margin:1% 0%;
`;
const StyleRowACG = styled(Row)`
	margin-top:1%;
`;
const Wrapper = styled.div`
	margin: 3% 0%;
	text-align: left;
`;
const Header = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	font-size: 20px;
	text-transform: uppercase;
`;
const StyleList = styled.div`
	margin-left:2%;
`;
const StyleItem = styled.div`
	width: 100%;
`;
const AddIcon = styled.div`
  float:right;
`;



class AssetManagement extends React.Component {
	listAccount = (acc) => {
		if (acc.address === '') return;
		let assets = [];
		if (acc.asset !=null && acc.asset != undefined){
			assets = Object.entries(acc.asset);
		}
		return <List.Item key={acc.address}>
			<StyleItem>
				<div>
					<StyledLink to={"/account/" + acc.address}><Header>{acc.address}</Header></StyledLink>
				</div>
				<StyleRowACG>
					<ColHead span={2}>
						ACG balance:
						</ColHead>
					<Col span={22}>
						{currencyFormat(acc.trxBalance/Math.pow(10,6))+" ACG"}
					</Col>
				</StyleRowACG>
				<div>
					<List
						itemLayout="horizontal"
						dataSource={assets}
						renderItem={([key, value]) => (
							this.listItem(key, value)
						)}
					/>
				</div>
			</StyleItem>
		</List.Item>;
	}

	listItem = (key, value) => {
		return <List.Item key={key}>
			<StyleItem>
				<StyleRow >
					<ColHead span={2}>
						Asset name:
						</ColHead>
					<Col span={22}>
						<StyledLink to={"/token/" + key}>{key}</StyledLink>
					</Col>
				</StyleRow>
				<StyleRow >
					<ColHead span={2}>
						Asset balance:
						</ColHead>
					<Col span={22}>
						{currencyFormat(value)}
					</Col>
				</StyleRow>
			</StyleItem>
		</List.Item>;
	}

	state = {
		loading: false,
		visible: false,
		newPrivatekey: "",
	};
	constructor(props) {
		super(props);
		this.handleNewPrivatekey = this.handleNewPrivatekey.bind(this);
	}
	handleNewPrivatekey(event) {
		this.setState((prevState, props) => ({
			...prevState,
			newPrivatekey: event.target.value
		}));
	}
	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = () => {
		this.setState((prevState, props) => ({
			...prevState,
			loading: true
		}));
		setTimeout(() => {
			this.setState((prevState, props) => ({
				...prevState,
				loading: false, visible: false
			}));
		}, 3000);
		//extract address from private key
		this.props.addAddrFromPrvkey(this.props.login.id,
			this.props.login.token,
			this.state.newPrivatekey);
		this.setState((prevState, props) => ({
			...prevState,
			newPrivatekey: ""
		}));
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	componentDidMount() {
		let { login } = this.props;
		if (login.token !== "") {
			this.props.loadAssetApi(login.id, login.token);
		}
	}

	render() {
		let { assetManagement, login } = this.props;
		let addresses = [];
		if (Object.keys(assetManagement.addresses).length === 0 && assetManagement.addresses.constructor === Object) {

		} else {
			addresses = Object.entries(assetManagement.addresses);
		}


		if (login.token === "") {
			return <Redirect to="/login" />
		}
		const { visible, loading } = this.state;
		return (
			<Wrapper>
				<Header>
					<Row >
						<Col span={6}>
							{login.token !== "" ? login.email : null}
						</Col>
						<Col span={18}>
							<AddIcon>
								<AppstoreAddOutlined onClick={this.showModal} />
								<Modal
									visible={visible}
									title="Enter private key to add:"
									onOk={this.handleOk}
									onCancel={this.handleCancel}
									footer={[
										<Button key="back" onClick={this.handleCancel}>
											Cancel
							            </Button>,
										<Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
											Add
							            </Button>,
									]}
								>
									<Input value={this.state.newPrivatekey} onChange={this.handleNewPrivatekey} />
								</Modal>
							</AddIcon>
						</Col>
					</Row>
				</Header>
				<StyleList>
					<div>
						<List
							itemLayout="horizontal"
							dataSource={addresses}
							renderItem={([key, value]) => (
								this.listAccount(value)
							)}
						/>
					</div>
				</StyleList>
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		assetManagement: state.assetManagement,
		login: state.login,
		account: state.account
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadAssetApi: (id, token) => {
			dispatch(loadAssetApi(id, token));
		},
		loadAccountDetails: (addr) => {
			dispatch(loadAccountDetails(addr));
		},
		addAddrFromPrvkey: (id, token, privkey) => {
			dispatch(addAddrFromPrvkey(id, token, privkey));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AssetManagement);
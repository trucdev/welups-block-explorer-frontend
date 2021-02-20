import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { List, Row, Col, Modal, Input, Button, Spin, notification } from 'antd';
import { currencyFormat } from '../../utils/utils';
import { AppstoreAddOutlined, LoadingOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { addAddrFromPrvkey } from '../../actions/assetManagement';
import { loadAccountDetails } from '../../actions/account';
import { LOGOUT, LOGIN_FAIL } from '../../actions/login';
import Addresses from './addresses';

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
const Wrapper = styled.div`
	margin: 1% 0%;
	text-align: left;
`;
const Header = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	text-transform: uppercase;
	@media (min-width: 280px) { 
		font-size:15px!important;
	}
	@media (min-width: 768px) { 
		font-size:20px!important;
	}
`;
const StyleItem = styled.div`
	width: 100%;
`;
const AddIcon = styled.div`
  float:right;
`;
const LineBreak = styled.div`
	word-break: break-all;
`;


class AssetManagement extends React.Component {

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
		if(this.state.newPrivatekey===""){
			notification.error({
			    message: `Error`,
			    description:
			      'Please enter new private key!',
			});
		}else{
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
		}
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	componentDidMount() {
	}

	render() {
		const antIcon = <LoadingOutlined spin />;
		let { assetManagement, login} = this.props;
		let addresses = [];
		if (Object.keys(assetManagement.addresses).length === 0 && assetManagement.addresses.constructor === Object) {

		} else {
			Object.entries(assetManagement.addresses).forEach(([key, value]) => {
				addresses.push(value);
			});
		}

		if (login.type ===LOGOUT||login.type===LOGIN_FAIL) {
			return <Redirect to="/login" />
		}
		const { visible, loading } = this.state;
		return (
			<Wrapper>
				<Spin indicator={antIcon} tip="Processing..."  spinning={assetManagement.status === "requesting"}>
					<Header>
						<Row >
							<Col span={20}>
								<LineBreak>
									{login.token !== "" ? login.email : null}
								</LineBreak>
							</Col>
							<Col span={4}>
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
					{login.token!==""?<Addresses/>:null}
				</Spin>
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		assetManagement: state.assetManagement,
		account: state.account,
		login: state.login,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loadAccountDetails: (addr) => {
			dispatch(loadAccountDetails(addr));
		},
		addAddrFromPrvkey: (id, token, privkey) => {
			dispatch(addAddrFromPrvkey(id, token, privkey));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AssetManagement);
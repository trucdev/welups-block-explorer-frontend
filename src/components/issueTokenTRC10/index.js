import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Spin, Form, Input, Button, InputNumber, DatePicker, Result, Select, notification } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { GLOBAL_SYMBOL } from '../../constant';
import {
	issueTRC10,
	ISSUE_TRC10_REQUESTING,
	reset,
	ISSUE_TRC10_SUCCESS,
	ISSUE_TRC10_FAIL,
	ISSUE_TRC10_NONE,
} from '../../actions/issueTokenTRC10';

const Header = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	font-size: 20px;
	text-transform: uppercase;
`;
const SubHeader = styled.div`
	text-align: left;
	font-size: 17px;
`;
const Wrapper = styled.div`
	margin: 1.5% 0% 2% 2%;
`;
const StyleDivider = styled(Divider)`
    margin: 15px 0;
`;
const StyleInputNumber = styled(InputNumber)`
    width: 100%;
`;
const StyleDatePicker = styled(DatePicker)`
    width: 100%;
`;

const { Option } = Select;

class IssueTokenTRC10 extends Component {
	componentWillUnmount() {
		this.props.resetIssueTRC10();
	}

	componentDidMount() {
		var { prikeys, login } = this.props;
		if ((!prikeys.prikeys && login.token !== "") || (prikeys.prikeys.length === 0 && login.token !== "")) {
			notification.warning({
				message: 'Warning!',
				description: "You have no private key, please add somes in private key management to perform transaction!",
			});
		}
	}

	onFinish = (values) => {
		values.end_time = values.end_time._d.valueOf();
		values.start_time = values.start_time._d.valueOf();
		values.frozen_supply = values.frozen_supply ? values.frozen_supply : {};
		this.props.issueTRC10(
			values.fromPrivKey,
			values.name,
			values.description,
			values.abbr,
			values.url_str,
			values.precision,
			values.total_supply,
			values.start_time,
			values.end_time,
			values.free_asset_net_limit,
			values.public_free_asset_net_limit,
			values.trx_num,
			values.ico_num,
			values.vote_score,
			values.frozen_supply,
		);

	}
	render() {
		const { issueTokenInfo, login, prikeys } = this.props;
		if (login.token === "") {
			return <Redirect to="/login" />
		}
		const antIcon = <LoadingOutlined spin />;
		return (
			<div>
				<Spin indicator={antIcon} tip="Processing..." spinning={issueTokenInfo.status === ISSUE_TRC10_REQUESTING}>
					<Header>Issue Token TRC10</Header>
					{issueTokenInfo.status === ISSUE_TRC10_SUCCESS &&
						<div>
							<Result
								status="success"
								title={`Your TRC10 has been issued successfully!`}
								subTitle={`You can check it at transaction ${issueTokenInfo.tranID}`}
								extra={[
									<Button type="primary">
										<Link to={`/transaction/${issueTokenInfo.tranID}`} >
											Details
                                    </Link>
									</Button>,
									<Button onClick={() => { this.props.resetIssueTRC10(); }}>New TRC10</Button>,
								]}
							/>,
					</div>}
					{issueTokenInfo.status === ISSUE_TRC10_FAIL &&
                        <div>
                            <Result
                                status="error"
                                title={`Your transaction hasn't been issued, something must went wrong`}
                                extra={[
                                    <Button onClick={() => { this.props.resetIssueTRC10(); }}>New TRC10</Button>,
                                ]}
                            />,
                        </div>}
					{(issueTokenInfo.status !== ISSUE_TRC10_SUCCESS && issueTokenInfo.status !== ISSUE_TRC10_FAIL) &&
						<Wrapper>
							<Form
								layout="vertical"
								name="basic"
								initialValues={{
									remember: true,
								}}
								onFinish={this.onFinish}
							>
								<SubHeader>Basic Information</SubHeader>
								<StyleDivider />
								<Row>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>

										<Form.Item
											label="Private Key of Issue:"
											name="fromPrivKey"
											rules={[
												{
													required: true,
													message: 'Please input your address!',
												},
											]}
										>
											<Select
												showSearch
												placeholder="Select a private key"
												allowClear
											>
												{prikeys.prikeys && prikeys.prikeys.length !== 0 ? prikeys.prikeys.map((value, index) => <Option value={value.prikey} key={index}>{value.name}</Option>) : null}
											</Select>
										</Form.Item>
									</Col>
									<Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="Token name:"
											name="name"
											rules={[
												{
													required: true,
													message: 'Please input your token name!',
													min: 2,
													max: 30
												},
											]}
										>
											<Input placeholder="2-30 characters for token name" />
										</Form.Item>

									</Col>
								</Row>
								<Row>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="Token abbreviation:"
											name="abbr"
											rules={[
												{
													required: true,
													message: 'Please input your token abbreviation!',
													min: 2,
													max: 10
												},
											]}
										>
											<Input placeholder="2-10 characters for token abbreviation" />
										</Form.Item>

									</Col>
									<Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>

										<Form.Item
											label="Token introduction:"
											name="description"
											rules={[
												{
													required: true,
													message: 'Please input your token introduction!',
													max: 200,
												},
											]}
										>
											<Input.TextArea placeholder="Brief description of the purpose of the token, not exceeding 200 characters" rows={4} />
										</Form.Item>

									</Col>
								</Row>
								<Row>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="Total Supply:"
											name="total_supply"
											rules={[
												{
													required: true,
													message: 'Please input your total supply!',
												},
											]}
										>
											<StyleInputNumber placeholder="Total token issuance(without precision)" />
										</Form.Item>
									</Col>
									<Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="Precision:"
											name="precision"
											rules={[
												{
													required: true,
													message: 'Please input your token precision!',
												},
											]}
										>
											<StyleInputNumber placeholder="0-6" />
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="Free asset net limit:"
											name="free_asset_net_limit"
											rules={[
												{
													required: true,
													message: 'Please input your token free asset net limit!',
												},
											]}
										>
											<StyleInputNumber placeholder="0" />
										</Form.Item>
									</Col>
									<Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="Public free asset net limit:"
											name="public_free_asset_net_limit"
											rules={[
												{
													required: true,
													message: 'Please input your token public free asset net limit!'
												},
											]}
										>
											<StyleInputNumber placeholder="0" />
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label={GLOBAL_SYMBOL + " number:"}
											name="trx_num"
											rules={[
												{
													required: true,
													message: 'Please input your trx number!',
												},
											]}
										>
											<StyleInputNumber placeholder="0" />
										</Form.Item>
									</Col>
									<Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="ICO number:"
											name="ico_num"
											rules={[
												{
													required: true,
													message: 'Please input your ico number!'
												},
											]}
										>
											<StyleInputNumber placeholder="0" />
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="Vote score:"
											name="vote_score"
											rules={[
												{
													required: true,
													message: 'Please input your vote score!',
												},
											]}
										>
											<StyleInputNumber placeholder="0" />
										</Form.Item>
									</Col>
									<Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="URL:"
											name="url_str"
											rules={[
												{
													required: true,
													message: 'Please input your url!',
												},
											]}
										>
											<Input placeholder="Website" />
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="Start date:"
											name="start_time"
											rules={[
												{
													required: true,
													message: 'Please input your token start date!',
												},
											]}
										>
											<StyleDatePicker placeholder="Start date" />
										</Form.Item>
									</Col>
									<Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
									<Col xs={24} sm={9} md={9} lg={9} xl={9}>
										<Form.Item
											label="End date:"
											name="end_time"
											rules={[
												{
													required: true,
													message: 'Please input your token end date!',
												},
											]}
										>
											<StyleDatePicker placeholder="End date" />
										</Form.Item>
									</Col>
								</Row>
								<Form.Item >
									<Row>
										<Col xs={16} sm={20} md={21} lg={21} xl={22}></Col>
										<Col xs={6} sm={4} md={3} lg={3} xl={2}>
											<Button type="primary" htmlType="submit">
												Submit
                                    </Button>
										</Col>
									</Row>
								</Form.Item>
							</Form>
						</Wrapper>}
				</Spin>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issueTokenInfo: state.issueTokenTRC10,
		prikeys: state.prikeyManagement,
		login: state.login,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		issueTRC10: (privKey,
			name,
			desc,
			abbr,
			url,
			precision,
			totalSupply,
			startTime,
			endTime,
			freeAssetNetLimit,
			publicFreeAssetNetLimit,
			trxNum,
			icoNum,
			voteScore,
			frozenSupply) => {
			dispatch(issueTRC10(privKey,
				name,
				desc,
				abbr,
				url,
				precision,
				totalSupply,
				startTime,
				endTime,
				freeAssetNetLimit,
				publicFreeAssetNetLimit,
				trxNum,
				icoNum,
				voteScore,
				frozenSupply));
		},
		resetIssueTRC10: () => {
			dispatch(reset());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(IssueTokenTRC10);
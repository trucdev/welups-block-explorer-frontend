import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Form, Input, Button, InputNumber, DatePicker, Result } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
	issueTRC10,
	reset,
	ISSUE_TRC10_SUCCESS,
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

class IssueTokenTRC10 extends Component {
	componentWillUnmount() {
		this.props.resetIssueTRC10();
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
		const { issueTokenInfo } = this.props;
		return (
			<div>
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
				{issueTokenInfo.status !== ISSUE_TRC10_SUCCESS &&
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
								<Col span={9}>

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
										<Input />
									</Form.Item>

								</Col>
								<Col span={6}></Col>
								<Col span={9}>
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
								<Col span={9}>
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
								<Col span={6}></Col>
								<Col span={9}>

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
								<Col span={9}>
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
								<Col span={6}></Col>
								<Col span={9}>


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
								<Col span={9}>
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
								<Col span={6}></Col>
								<Col span={9}>
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
								<Col span={9}>
									<Form.Item
										label="ACG number:"
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
								<Col span={6}></Col>
								<Col span={9}>
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
								<Col span={9}>
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
								<Col span={6}></Col>
								<Col span={9}>
									<Form.Item
										label="URL:"
										name="url_str"
									>
										<Input placeholder="Website" />
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={9}>
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
								<Col span={6}></Col>
								<Col span={9}>
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
									<Col span={22}></Col>
									<Col span={2}>
										<Button type="primary" htmlType="submit">
											Submit
                                    </Button>
									</Col>
								</Row>
							</Form.Item>
						</Form>
					</Wrapper>}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issueTokenInfo: state.issueTokenTRC10,
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
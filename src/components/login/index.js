import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkAccountApi, LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_FAIL } from '../../actions/login';
import styled from 'styled-components';
import { Form, Input, Button, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import ACLogo from "../../assets/images/ACLogo.png";

const StyledLinkLeft = styled(Link)`
	&:link, &:visited {
		color: #c23631;
	}
	float:left;
`;
const StyledLinkRight = styled(Link)`
	&:link, &:visited {
		color: #c23631;
	}
	float:right;
`;
const Logo = styled.img`
  height: 66px;
  width: 55px;
  margin-bottom: 20px;
`;
const ButtonSubmit = styled(Button)`
	width:100%;
`;
const Item = styled(Form.Item)`
	font-weight: bold;
`;
const Wrapper = styled.div`
    margin: 5px;
    width: 100%;
`;
const StyledForm = styled(Form)`
  @media (min-width: 540px) {
    width: 450px;
  }
  @media (max-width: 450px) {
    width: 400px;
  }
`;
const HeaderTitle = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: 600;
`;
const Container = styled.div`
    display: flex;
	width:100%;
    height:100%;
    justify-content: center;
`;

class Login extends React.Component {
	onFinish = (allValues) => {
		this.props.checkAccountApi({
			email: allValues.email,
			password: allValues.password
		});
	}
	render() {
		const antIcon = <LoadingOutlined spin />;
		var { login } = this.props;
		var code = login.code;
		if (login.type === LOGIN_SUCCESS || login.token !== "") {
			return <Redirect to="/user" />
		}
		if (code === 2) {
			return <Redirect to="/activate-account" />
		}
		return (
			<Wrapper>
				<Spin indicator={antIcon} tip="Processing..." spinning={login.type === LOGIN_REQUESTING}>
					<Container>
						<StyledForm
							layout="vertical"
							name="login"
							initialValues={{
								remember: true,
							}}
							onFinish={this.onFinish}
							size="large"
						>
							<HeaderTitle>
								<Logo src={ACLogo} />
								<Title>Login</Title>
							</HeaderTitle>
							<Item
								label="Email"
								name="email"
								rules={[
									{
										type: 'email',
										message: 'The input is not valid E-mail!',
									},
									{
										required: true,
										message: 'Please input your email!',
									}
								]}
							>
								<Input placeholder="Email" />
							</Item>
							<Item
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input.Password placeholder="Password" />
							</Item>
							<ButtonSubmit type="primary" htmlType="submit">
								Log in
				        </ButtonSubmit>
							<Form.Item >
								<StyledLinkLeft to={"/resetpassword"} >Forgot password?</StyledLinkLeft>
								<StyledLinkRight to={"/signup"} >Sign up</StyledLinkRight>
							</Form.Item>
						</StyledForm>
					</Container>
				</Spin>
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		login: state.login,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		checkAccountApi: (acc) => {
			dispatch(checkAccountApi(acc));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Login);
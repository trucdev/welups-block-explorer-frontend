import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkAccountApi, LOGIN_REQUESTING } from '../../actions/login';
import styled from 'styled-components';
import { Form, Input, Button, Spin } from 'antd';
import  { Redirect } from 'react-router-dom';
import { LoadingOutlined} from '@ant-design/icons';

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
const ButtonSubmit = styled(Button)`
	width:100%;
`;
const Item = styled(Form.Item)`
	font-weight: bold;
`;
const Wrapper = styled.div`
	margin: 10% 30%;
`;


class Login extends React.Component {
	onFinish = (allValues) =>{
		this.props.checkAccountApi({
			email:allValues.email,
			password:allValues.password
		});
	}	
	render() {
		const antIcon = <LoadingOutlined spin />;
		var {login} = this.props;
		if(login.status === "success"||login.token!==""){
			return <Redirect to="/user" />
		}
		return (
			<Wrapper>
				<Spin indicator={antIcon} tip="Processing..."  spinning={login.type === LOGIN_REQUESTING}>
				<Form
					layout = "vertical"
				    name="login"
				    initialValues={{
				       	remember: true,
				    }}
				    onFinish = {this.onFinish}
				    size = "large"
			    >
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
				        <Input placeholder="Email"/>
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
				        <Input.Password placeholder="Password"/>
				    </Item>
				    	<ButtonSubmit type="primary" htmlType="submit">
							Log in
				        </ButtonSubmit>
				    <Form.Item >
				        <StyledLinkLeft to={"/forgotpassword"} >Forgot password?</StyledLinkLeft>
				        <StyledLinkRight to={"/signup"} >Sign up</StyledLinkRight>
				    </Form.Item>
			    </Form>
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
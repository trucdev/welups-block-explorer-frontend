import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkAccountApi } from '../../actions/login';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import {
  BrowserRouter as Router,
  Route, Redirect, Switch
} from "react-router-dom";

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
const SmallItem = styled(Form.Item)`
	margin-bottom: 0px!important;
`;
const Wrapper = styled.div`
	margin: 10% 30%;
`;


class Login extends React.Component {

	onFinish = (allValues) =>{
		var test = this.props.checkAccountApi({
			email:allValues.email,
			password:allValues.password
		});
	}	

	render() {
		var {login} = this.props;
		if(login){
			return <Redirect to="/user" />
		}
		return (
			<Wrapper>
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
				    <SmallItem  name="remember" valuePropName="checked">
				    	<ButtonSubmit type="primary" htmlType="submit">
				            Log in
				        </ButtonSubmit>
				    </SmallItem>
				    <Form.Item >
				        <StyledLinkLeft to={"/account/"} target="_blank">Forgot password?</StyledLinkLeft>
				        <StyledLinkRight to={"/signup"} target="_blank">Sign up</StyledLinkRight>
				    </Form.Item>
			    </Form>
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
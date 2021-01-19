import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateSignUp } from '../../actions/signup';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, } from 'antd';
import ACLogo from '../../assets/images/ACLogo.png';

const StyledLinkLeft = styled(Link)`
	&:link, &:visited {
		color: #c23631;
	}
	float:left;
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
    display: flex;
	width:100%;
    height:100%;
    justify-content: center;
`;
const Container = styled.div`
    width:450px;
`;
const Logo = styled.img`
    height: 66px;
    width: 55px;
    margin-bottom: 20px;
`;
const StyledCheckbox = styled(Checkbox)`
    float:left;
`;
const Title = styled.span`
    font-size: 25px;
    font-weight: 600;
`;


class SignUp extends React.Component {

    onChange = (changedValues, allValues) => {
        this.props.updateSignUp({
            email: allValues.email,
            password: allValues.password
        });
    }
    render() {
        return (
            <Wrapper>
                <Container>
                    <Form
                        layout="vertical"
                        name="login"
                        initialValues={{
                            remember: true,
                        }}
                        onValuesChange={this.onChange}
                        size="large"
                    >
                        <Logo src={ACLogo} />
                        <Item>
                            <Title>Create Account</Title>
                        </Item>
                        <Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Item>
                        <Item
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
                        <Item
                            name="confirm password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirm Password Must Be Match With Password',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Confirm Password" />
                        </Item>
                        <Form.Item >
                            <StyledCheckbox>I agree to sign up <Link>terms and conditions</Link></StyledCheckbox>
                        </Form.Item>
                        <SmallItem name="remember" valuePropName="checked">
                            <ButtonSubmit type="primary" htmlType="submit">Create</ButtonSubmit>
                        </SmallItem>
                        <Form.Item >
                            <StyledLinkLeft to={"/login"}>Already have account? Login</StyledLinkLeft>
                        </Form.Item>
                    </Form>
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.email,
        password: state.password
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateSignUp: (acc) => {
            dispatch(updateSignUp(acc));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SignUp);
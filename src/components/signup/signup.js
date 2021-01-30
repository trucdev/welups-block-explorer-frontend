import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signUp, reset, SIGNUP_REQUESTING, SIGNUP_SUCCESS } from '../../actions/signup';
import styled from 'styled-components';
import { Form, Input, Button, Spin, Checkbox } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
    componentWillUnmount() {
        this.props.resetSignUp();
    }
    onSignUp = (values) => {
        this.props.doSignUp(
            values.email,
            values.password
        );
    };
    render() {
        const { signUpInfo } = this.props;
        if (signUpInfo.status === SIGNUP_SUCCESS) {
            return <Redirect to="/login" />
        }
        const antIcon = <LoadingOutlined spin />;
        return (
            <Wrapper>
                <Container>
                    <Spin indicator={antIcon} tip="Processing..." spinning={signUpInfo.status === SIGNUP_REQUESTING}>
                        <Form
                            layout="vertical"
                            name="login"
                            initialValues={{
                                remember: true,
                            }}
                            size="large"
                            onFinish={this.onSignUp}
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
                                <StyledCheckbox>I agree to sign up <Link to=''>terms and conditions</Link></StyledCheckbox>
                            </Form.Item>
                            <SmallItem name="remember" valuePropName="checked">
                                <ButtonSubmit type="primary" htmlType="submit">Create</ButtonSubmit>
                            </SmallItem>
                            <Form.Item >
                                <StyledLinkLeft to={"/login"}>Already have account? Login</StyledLinkLeft>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signUpInfo: state.signUpReducer,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        doSignUp: (email, password) => {
            dispatch(signUp(email, password));
        },
        resetSignUp: () => {
            dispatch(reset());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SignUp);
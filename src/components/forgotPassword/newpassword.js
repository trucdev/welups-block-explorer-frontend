import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Input, Button, Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LeftHeader = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	font-size: 20px;
	text-transform: uppercase;
`;
const Wrapper = styled.div`
	margin: 5px;
    width: 100%;
`;
const StyledForm = styled(Form)`
    border-width: 1px;
    width: 40%;
    margin-left: 30%;
    margin-top: 20px;
`;
const StyleButton = styled(Button)`
    background-color: #c23631;
    border-color: #c23631;
    font-weight: 400;
    width: 100%;
`;
const ButtonContainer = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

`;
const FlexStartView = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`;
const StyledItem = styled(Form.Item)`
    background-color: #ffffff;
    margin-bottom: 0px;
`;
const Content = styled.span`
    font-size: 15px;
`;

class NewPassword extends React.Component {
    render() {
        const antIcon = <LoadingOutlined spin />;
        return (
            <Wrapper>
                {/* <Spin indicator={antIcon} tip="Processing..." > */}
                <LeftHeader>Create new password</LeftHeader>
                <StyledForm
                    size="large"
                >
                    <Form.Item>
                        <FlexStartView>
                            <Content>Create a new password with at least 8 characters. A strong password is a combination of characters, numbers, and punctuation.</Content>
                        </FlexStartView>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 8,
                                    max: 16,
                                    message: 'Password must be 8-16 characters',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        name="confirm password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Passwords did not match!');
                                },
                            })
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                    <StyledItem >
                        <ButtonContainer>
                            <StyleButton type="primary" href="/login">
                                Continue
                        </StyleButton>
                        </ButtonContainer>
                    </StyledItem>
                </StyledForm>
                {/* </Spin> */}
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(NewPassword);
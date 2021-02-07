import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Input, Button, Spin, notification } from 'antd';
import { Redirect } from 'react-router-dom';
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
const SearchButton = styled(Button)`
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
    text-align: left;
`;
const StyledItem = styled(Form.Item)`
    background-color: #ffffff;
    margin-bottom: 0px;
`;
const Content = styled.span`
    font-size: 15px;
`;
const { Search } = Input;

const openNotification = () => {
    notification.open({
        message: 'Email found',
        description:
            'A verification code has been sent to your email address, please check for verification code.',
    });
};

class ForgotPassword extends React.Component {
    onFinish = (allValues) => {
        this.props.checkAccountApi({
            email: allValues.email,
        });
    }
    render() {
        const antIcon = <LoadingOutlined spin />;
        return (
            <Wrapper>
                {/* <Spin indicator={antIcon} tip="Processing..." > */}
                <LeftHeader>Find your account</LeftHeader>
                <StyledForm
                    onFinish={this.onFinish}
                    size="large"
                >
                    <Form.Item>
                        <FlexStartView>
                            <Content>Please enter your email to search for your account.</Content>
                        </FlexStartView>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Your E-mail is invalid!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <FlexStartView>

                            <Search
                                placeholder="Email"
                                enterButton="Search"
                                onSearch={openNotification}
                            />
                        </FlexStartView>
                    </Form.Item>
                    <Form.Item>
                        <FlexStartView>
                            <Content>Email verification code</Content>
                        </FlexStartView>
                    </Form.Item>
                    <Form.Item
                        name="verifycode"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your verify code!',
                            },
                        ]}
                    >
                        <FlexStartView>
                            <Input placeholder="Security code" />
                        </FlexStartView>
                    </Form.Item>
                    <StyledItem >
                        <ButtonContainer>
                            <SearchButton  htmlType="submit" type="primary" href="/newpassword">
                                Continue
                        </SearchButton>
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
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ForgotPassword);
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Spin, notification } from 'antd';
import { Redirect } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { activateMail, ACTIVATE_SUCCESS, ACTIVATE_REQUESTING, reset, ACTIVATE_NONE } from '../../actions/signup';
import { checkAccountApi } from '../../actions/login';

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

class ActivateAccount extends React.Component {
    componentWillUnmount() {
        this.props.resetSignUp();
    }
    onActivate = (values) => {
        
        var email = this.props.signUp.email ? this.props.signUp.email : this.props.login.email;
        this.props.doActivate(
            values.token,
            email
        )
    }
    render() {
        const antIcon = <LoadingOutlined spin />;
        const {activateMail} = this.props;
        console.log(activateMail)
        if (activateMail.type === ACTIVATE_SUCCESS ){
            return <Redirect to="/login" />
        }
        return (
            <Wrapper>
                <Spin indicator={antIcon} tip="Processing..." spinning={activateMail.type === ACTIVATE_REQUESTING}>
                <LeftHeader>Activate your account</LeftHeader>
                <StyledForm
                    name="activate-account"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onActivate ? this.onActivate : this.onVerify}
                    size="large"
                >
                    <Form.Item>
                        <FlexStartView>
                            <Content>Please enter the verification code from email.</Content>
                        </FlexStartView>
                    </Form.Item>
                    <Form.Item
                        name="token"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your verification code!',
                            },
                        ]}
                    >
                            <Input/>
                        
                    </Form.Item>
                    <StyledItem >
                        <ButtonContainer>
                            <SearchButton  htmlType="submit" type="primary">
                                Continue
                        </SearchButton>
                        </ButtonContainer>
                    </StyledItem>
                </StyledForm>
                </Spin>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activateMail: state.activateMail,
        signUp: state.signUpReducer,
        login: state.login,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        doActivate: (token, email) => {
            dispatch(activateMail(token, email));
        },
        resetSignUp: () => {
            dispatch(reset());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ActivateAccount);
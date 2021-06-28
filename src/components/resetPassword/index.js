import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Input, Button, Spin, notification } from 'antd'
import { Redirect } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import {
  sendToken,
  SEND_TOKEN_SUCCESS,
  SEND_TOKEN_REQUESTING,
  SEND_TOKEN_NONE,
  reset,
} from '../../actions/resetPassword'

const LeftHeader = styled.div`
  text-align: left;
  border-bottom: 5px solid #c23631;
  font-size: 20px;
  text-transform: uppercase;
`
const Wrapper = styled.div`
  margin: 5px;
  width: 100%;
`
const StyledForm = styled(Form)`
  @media (min-width: 540px) {
    width: 450px;
  }
  @media (max-width: 450px) {
    width: 400px;
  }
`
const SearchButton = styled(Button)`
  background-color: #c23631;
  border-color: #c23631;
  font-weight: 400;
  width: 100%;
`
const ButtonContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const FlexStartView = styled.div`
  text-align: left;
`
const StyledItem = styled(Form.Item)`
  background-color: #ffffff;
  margin-bottom: 0px;
`
const Content = styled.span`
  font-size: 15px;
`
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`

class ResetPassword extends React.Component {
  componentWillUnmount() {
    this.props.resetForgotPassword()
  }
  onFinish = (email) => {
    this.props.toSendToken(email.email)
  }
  render() {
    const antIcon = <LoadingOutlined spin />
    const { sendToken } = this.props
    if (sendToken.type === SEND_TOKEN_SUCCESS) {
      return <Redirect to="/newpassword" />
    }
    return (
      <Wrapper>
        <Spin
          indicator={antIcon}
          tip="Processing..."
          spinning={sendToken.type === SEND_TOKEN_REQUESTING}
        >
          <LeftHeader>Find your account</LeftHeader>
          <Container>
            <StyledForm name="send-token" onFinish={this.onFinish} size="large">
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
                    message: 'Email is invalid',
                  },
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <StyledItem>
                <ButtonContainer>
                  <SearchButton htmlType="submit" type="primary">
                    Continue
                  </SearchButton>
                </ButtonContainer>
              </StyledItem>
            </StyledForm>
          </Container>
        </Spin>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sendToken: state.sendToken,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toSendToken: (email) => {
      dispatch(sendToken(email))
    },
    resetForgotPassword: () => {
      dispatch(reset())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  ResetPassword
)

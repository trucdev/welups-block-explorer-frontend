import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Input, Button, Spin, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import {
  newPassword,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_REQUESTING,
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
const StyleButton = styled(Button)`
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
  margin-top: 20px;
  margin-bottom: 20px;
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

class NewPassword extends React.Component {
  onCreateNewPassword = (values) => {
    var email = this.props.sendToken.email
    this.props.createNewPassword(values.token, values.password, email)
  }

  render() {
    const { newPassword } = this.props
    if (newPassword.type === NEW_PASSWORD_SUCCESS) {
      return <Redirect to="/login" />
    }
    const antIcon = <LoadingOutlined spin />
    return (
      <Wrapper>
        <Spin
          indicator={antIcon}
          tip="Processing..."
          spinning={newPassword.type === NEW_PASSWORD_REQUESTING}
        >
          <LeftHeader>Create new password</LeftHeader>
          <Container>
            <StyledForm
              name="new-password"
              initialValues={{
                remember: true,
              }}
              size="large"
              onFinish={this.onCreateNewPassword}
            >
              <Form.Item
                name="token"
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
              <Form.Item>
                <FlexStartView>
                  <Content>
                    Create a new password with at least 8 characters. A strong password is a
                    combination of characters, numbers, and punctuation.
                  </Content>
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
                        return Promise.resolve()
                      }
                      return Promise.reject('Passwords did not match!')
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <StyledItem>
                <ButtonContainer>
                  <StyleButton type="primary" htmlType="submit">
                    Continue
                  </StyleButton>
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
    newPassword: state.newPassword,
    sendToken: state.sendToken,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createNewPassword: (token, password, email) => {
      dispatch(newPassword(token, password, email))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(NewPassword)

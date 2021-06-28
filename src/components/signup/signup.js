import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { signUp, SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../../actions/signup'
import styled from 'styled-components'
import { Form, Input, Button, Spin, Checkbox } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import WUelupsLogo from '../../assets/images/WUelupsLogo.png'

const StyledLinkLeft = styled(Link)`
  &:link,
  &:visited {
    color: #c23631;
  }
  float: left;
`
const ButtonSubmit = styled(Button)`
  width: 100%;
`
const Item = styled(Form.Item)`
  font-weight: bold;
`
const SmallItem = styled(Form.Item)`
  margin-bottom: 0px !important;
`
const Wrapper = styled.div`
  margin: 5px;
  width: 100%;
`
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`
const Logo = styled.img`
  height: 66px;
  width: 200px;
  margin-bottom: 20px;
`
const StyledCheckbox = styled(Checkbox)`
  float: left;
`
const Title = styled.span`
  font-size: 25px;
  font-weight: 600;
`
const StyledForm = styled(Form)`
  @media (min-width: 540px) {
    width: 450px;
  }
  @media (max-width: 450px) {
    width: 400px;
  }
`

class SignUp extends React.Component {
  onSignUp = (values) => {
    this.props.doSignUp(values.email, values.password)
  }
  render() {
    const { signUpInfo } = this.props
    switch (signUpInfo.status) {
      case 'SIGNUP_SUCCESS':
        return <Redirect to="/activate-account" />
    }
    const antIcon = <LoadingOutlined spin />
    return (
      <Wrapper>
        <Spin
          indicator={antIcon}
          tip="Processing..."
          spinning={signUpInfo.status === SIGNUP_REQUESTING}
        >
          <Container>
            <StyledForm
              layout="vertical"
              name="login"
              initialValues={{
                remember: true,
              }}
              size="large"
              onFinish={this.onSignUp}
            >
              {/* <Logo src={WUelupsLogo} /> */}
              <Item>
                <Title>Create Account</Title>
              </Item>
              <Item
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
              </Item>
              <Item
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
              </Item>
              <Item
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
              </Item>
              <Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) => (value ? Promise.resolve() : Promise.reject('')),
                  },
                ]}
              >
                <StyledCheckbox>
                  I agree to sign up <Link>terms and conditions</Link>
                </StyledCheckbox>
              </Item>
              <SmallItem name="remember" valuePropName="checked">
                <ButtonSubmit type="primary" htmlType="submit">
                  Create
                </ButtonSubmit>
              </SmallItem>
              <Form.Item>
                <StyledLinkLeft to={'/login'}>Already have account? Login</StyledLinkLeft>
              </Form.Item>
            </StyledForm>
          </Container>
        </Spin>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signUpInfo: state.signUpReducer,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    doSignUp: (email, password) => {
      dispatch(signUp(email, password))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SignUp)

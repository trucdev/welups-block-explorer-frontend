import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Form, Input, Button, Spin } from 'antd'
import { checkAccountApi } from '../../actions/login'
import { Redirect } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import {
  activateMail,
  ACTIVATE_SUCCESS,
  ACTIVATE_REQUESTING,
  reset,
  ACTIVATE_NONE,
} from '../../actions/signup'
import PageHeader from './../partials/pageHeader'

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

class ActivateAccount extends React.Component {
  componentDidMount() {
    this.props.resetSignUp()
  }
  onActivate = (values) => {
    var email = this.props.signUp.email ? this.props.signUp.email : this.props.login.email
    var password = this.props.signUp.password
      ? this.props.signUp.password
      : this.props.login.password
    this.props.doActivate(values.token, email, password)
  }
  render() {
    const antIcon = <LoadingOutlined spin />
    const { activateMail } = this.props
    if (activateMail.type === ACTIVATE_SUCCESS) {
      return <Redirect to="/user" />
    }
    return (
      <Wrapper>
        <Spin
          indicator={antIcon}
          tip="Processing..."
          spinning={activateMail.type === ACTIVATE_REQUESTING}
        >
          <PageHeader>Activate your account</PageHeader>
          <Container>
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
                <Input />
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
    activateMail: state.activateMail,
    signUp: state.signUpReducer,
    login: state.login,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    doActivate: (token, email, password) => {
      dispatch(activateMail(token, email, password))
    },
    resetSignUp: () => {
      dispatch(reset())
    },
    checkAccountApi: (acc) => {
      dispatch(checkAccountApi(acc))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  ActivateAccount
)

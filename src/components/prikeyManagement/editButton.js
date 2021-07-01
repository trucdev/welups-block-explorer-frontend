import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPriKey, checkPassword, setShowState } from '../../actions/prikeyManagement'
import { Row, Col, Modal, Input, Button, Form } from 'antd'

class EditButton extends Component {
  formRef = React.createRef()
  state = {
    loading: false,
    visible: false,
  }

  showModal = (e) => {
    e.preventDefault()
    this.setState({
      visible: true,
    })
  }

  handleOk = (values) => {
    var { ind, prikeys } = this.props
    this.props.editPriKey(ind, values, prikeys.email)
    this.props.setShowState(false)
    this.formRef.current.resetFields()
    this.setState({ visible: false })
  }

  handleCancel = () => {
    this.props.setShowState(false)
    this.formRef.current.resetFields()
    this.setState({ visible: false })
  }

  handleCheckPassword = (values) => {
    var { prikeys } = this.props
    this.formRef.current.resetFields()
    this.props.checkPassword(prikeys.email, values.password)
  }

  render() {
    var { val, prikeys } = this.props
    const { visible, loading } = this.state
    return (
      <Col>
        <Button type="primary" onClick={(e) => this.showModal(e)}>
          Edit
        </Button>
        <Modal visible={visible} onCancel={this.handleCancel} footer={null}>
          {prikeys.isShowPrikey ? (
            <Form
              layout="vertical"
              name="login"
              initialValues={{
                remember: true,
              }}
              onFinish={this.handleOk}
              size="medium"
              ref={this.formRef}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your private key name!',
                  },
                ]}
                initialValue={val.name}
              >
                <Input placeholder="Private key name" />
              </Form.Item>
              <Form.Item
                label="Private Key"
                name="prikey"
                rules={[
                  {
                    required: true,
                    message: 'Please input your private key!',
                  },
                ]}
                initialValue={val.prikey}
              >
                <Input.Password />
              </Form.Item>
              <Row>
                <Col>
                  <Button htmlType="submit" type="primary" loading={loading}>
                    Edit
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col>
                  <Button key="back" onClick={this.handleCancel}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form
              layout="vertical"
              name="login"
              onFinish={this.handleCheckPassword}
              size="medium"
              ref={this.formRef}
            >
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your private key name!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Row>
                <Col>
                  <Button htmlType="submit" type="primary" loading={loading}>
                    Done
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col>
                  <Button key="back" onClick={this.handleCancel}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Modal>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prikeys: state.prikeyManagement,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    editPriKey: (index, prikey, email) => {
      dispatch(editPriKey(index, prikey, email))
    },
    checkPassword: (email, password) => {
      dispatch(checkPassword(email, password))
    },
    setShowState: (value) => {
      dispatch(setShowState(value))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(EditButton)

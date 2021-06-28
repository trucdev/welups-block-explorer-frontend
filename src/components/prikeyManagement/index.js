import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToStorage, deletePriKey } from '../../actions/prikeyManagement'
import { Row, Col, Modal, Input, Button, Form, Table, notification } from 'antd'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { AppstoreAddOutlined, LoadingOutlined } from '@ant-design/icons'
import EditButton from './editButton'

const Wrapper = styled.div`
  margin: 1% 0%;
  text-align: left;
`
const Header = styled.div`
  text-align: left;
  border-bottom: 5px solid #c23631;
  text-transform: uppercase;
  @media (min-width: 280px) {
    font-size: 15px !important;
  }
  @media (min-width: 768px) {
    font-size: 20px !important;
  }
`
const AddIcon = styled.div`
  float: right;
`
const LineBreak = styled.div`
  word-break: break-all;
`

class PriKeyManagement extends Component {
  componentDidMount() {
    var { prikeys, login } = this.props
    if (
      (!prikeys.prikeys && login.token !== '') ||
      (prikeys.prikeys.length === 0 && login.token !== '')
    ) {
      notification.warning({
        message: 'Warning!',
        description:
          'You have no private key, please add somes in private key management to perform transaction!',
      })
    }
  }

  onDelete = (e, index) => {
    e.preventDefault()
    var { login } = this.props
    this.props.deletePriKey(index, login.email)
  }

  onEdit = (e, index) => {
    e.preventDefault()
    this.props.deletePriKey(index)
  }

  columns = [
    {
      title: 'No.',
      key: 'no',
      render: (value, item, index) => index + 1,
      fixed: 'left',
      width: 70,
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Address',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: 'Private Key',
      key: 'prikey',
      dataIndex: 'prikey',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (value, item, index) => {
        return (
          <Row>
            <Col>
              <Button type="primary" onClick={(e) => this.onDelete(e, index)}>
                Delete
              </Button>
            </Col>
            <Col span={1}></Col>
            <EditButton ind={index} val={value} />
          </Row>
        )
      },
    },
  ]

  state = {
    loading: false,
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = (values) => {
    var { login } = this.props
    this.props.addToStorage(values, login.email)
    this.setState({ visible: false })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    var { login } = this.props
    if (login.token === '') {
      return <Redirect to="/login" />
    }
    const { visible, loading } = this.state
    var { prikeys } = this.props
    return (
      <Wrapper>
        <Header>
          <Row>
            <Col span={20}>
              <LineBreak>PriKey Management</LineBreak>
            </Col>
            <Col span={4}>
              <AddIcon>
                <AppstoreAddOutlined onClick={this.showModal} />
                <Modal visible={visible} onCancel={this.handleCancel} footer={null}>
                  <Form
                    layout="vertical"
                    name="login"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={this.handleOk}
                    size="medium"
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
                    >
                      <Input placeholder="Private key" />
                    </Form.Item>
                    <Row>
                      <Col>
                        <Button htmlType="submit" type="primary" loading={loading}>
                          Add
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
                </Modal>
              </AddIcon>
            </Col>
          </Row>
        </Header>
        <Table
          columns={this.columns}
          dataSource={prikeys.prikeys}
          rowKey="prikey"
          scroll={{ x: 1300 }}
          sticky
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prikeys: state.prikeyManagement,
    login: state.login,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addToStorage: (prikey, email) => {
      dispatch(addToStorage(prikey, email))
    },
    deletePriKey: (index, email) => {
      dispatch(deletePriKey(index, email))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  PriKeyManagement
)

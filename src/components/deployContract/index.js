import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Divider,
  Form,
  Button,
  InputNumber,
  Result,
  Spin,
  Select,
  notification,
  Upload,
} from 'antd'
import styled from 'styled-components'
import getVersions from '../../utils/compiler'
import { Link, Redirect } from 'react-router-dom'
import {
  deployContract,
  reset,
  DEPLOY_CONTRACT_SUCCESS,
  DEPLOY_CONTRACT_REQUESTING,
  DEPLOY_CONTRACT_FAIL,
  compileContract,
  upload,
  remove,
} from '../../actions/deployContract'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'

const Header = styled.div`
  text-align: left;
  border-bottom: 5px solid #c23631;
  font-size: 20px;
  text-transform: uppercase;
`
const SubHeader = styled.div`
  text-align: left;
  font-size: 17px;
`
const Wrapper = styled.div`
  margin: 1.5% 0% 2% 2%;
`
const StyleDivider = styled(Divider)`
  margin: 15px 0;
`
const StyleInputNumber = styled(InputNumber)`
  width: 100%;
`
const { Option } = Select

class DeployContract extends Component {
  constructor(props) {
    super(props)
    this.state = { versions: {}, selectedVersion: '' }
  }
  componentWillUnmount() {
    this.props.resetDeployContract()
  }

  componentDidMount() {
    const loadVersions = ({ soljsonReleases }) => {
      this.setState({
        versions: soljsonReleases,
      })
    }
    getVersions().then(loadVersions)
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

  onFinish = (values) => {
    const { deployContractInfo } = this.props
    const name = JSON.parse(values.name)
    this.props.deployContract(
      values.from,
      name.keyContract,
      JSON.stringify(deployContractInfo.infos[name.keyFile][name.keyContract].abi),
      deployContractInfo.infos[name.keyFile][name.keyContract].evm.bytecode.object,
      values.feeLimit,
      values.curPercent,
      values.oeLimit
    )
  }

  onChangeVersion = (value) => {
    this.setState((state) => {
      return { ...state, selectedVersion: value }
    })
  }

  onCompile = () => {
    var { deployContractInfo } = this.props
    if (deployContractInfo.contracts && Object.keys(deployContractInfo.contracts).length !== 0) {
      this.props.compileContract(deployContractInfo.contracts, this.state.selectedVersion)
    } else {
      notification.error({
        message: 'Error!',
        description: 'Please upload a file first!',
      })
    }
  }

  render() {
    const antIcon = <LoadingOutlined />
    const { deployContractInfo, login, prikeys } = this.props
    if (login.token === '') {
      return <Redirect to="/login" />
    }
    const versions = this.state.versions
    return (
      <div>
        <Header>Deploy Smart Contract</Header>
        {deployContractInfo.status === DEPLOY_CONTRACT_SUCCESS && (
          <div>
            <Result
              status="success"
              title={`Your contract has been deplyed successfully!`}
              subTitle={`You can check it at transaction ${deployContractInfo.tranID}`}
              extra={[
                <Button key="detail" type="primary">
                  <Link to={`/transaction/${deployContractInfo.tranID}`}>Details</Link>
                </Button>,
                <Button
                  key="new"
                  onClick={() => {
                    this.props.resetDeployContract()
                  }}
                >
                  New{' '}
                </Button>,
              ]}
            />
            ,
          </div>
        )}
        {deployContractInfo.status === DEPLOY_CONTRACT_FAIL && (
          <div>
            <Result
              status="error"
              title={`Your transaction hasn't been issued, something must went wrong`}
              extra={[
                <Button
                  onClick={() => {
                    this.props.resetDeployContract()
                  }}
                >
                  New Transfer
                </Button>,
              ]}
            />
            ,
          </div>
        )}
        {deployContractInfo.status !== DEPLOY_CONTRACT_SUCCESS &&
          deployContractInfo.status !== DEPLOY_CONTRACT_FAIL && (
            <Wrapper>
              <Spin
                indicator={antIcon}
                tip="Processing..."
                spinning={deployContractInfo.status === DEPLOY_CONTRACT_REQUESTING}
              >
                <SubHeader>Upload and Compile</SubHeader>
                <StyleDivider />
                <Form
                  layout="horizontal"
                  name="compile"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onCompile}
                >
                  <Row>
                    <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                      <Upload
                        accept=".sol"
                        multiple
                        beforeUpload={(file) => {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            this.props.upload({ fileName: file.name, content: e.target.result })
                          }
                          reader.readAsText(file)
                          return false
                        }}
                        onRemove={(file) => {
                          this.props.remove(file.name)
                        }}
                      >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </Col>
                    <Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
                    <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                      <Form.Item
                        label="Compile version:"
                        name="version"
                        rules={[
                          {
                            required: true,
                            message: 'Please choose a suitable version!',
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select a version"
                          allowClear
                          onChange={this.onChangeVersion}
                        >
                          {Object.entries(versions).map(([key, value]) => (
                            <Option value={value} key={key}>
                              {key}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Row>
                      <Col xs={16} sm={20} md={21} lg={21} xl={22}></Col>
                      <Col xs={6} sm={4} md={3} lg={3} xl={2}>
                        <Button type="primary" htmlType="submit">
                          Compile
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
                {deployContractInfo.infos ? (
                  <div>
                    <SubHeader>Contract Information</SubHeader>
                    <StyleDivider />
                    <Form
                      layout="vertical"
                      name="deploy"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={this.onFinish}
                    >
                      <Row>
                        <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                          <Form.Item
                            label="Private key:"
                            name="from"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your private key!',
                              },
                            ]}
                          >
                            <Select showSearch placeholder="Select a private key" allowClear>
                              {prikeys.prikeys && prikeys.prikeys.length !== 0
                                ? prikeys.prikeys.map((value, index) => (
                                    <Option value={value.prikey} key={index}>
                                      {value.name}
                                    </Option>
                                  ))
                                : null}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
                        <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                          <Form.Item
                            label="Fee Limit:"
                            name="feeLimit"
                            initialValue={100000000}
                            rules={[
                              {
                                required: true,
                                message: 'Please input your fee limit',
                              },
                            ]}
                          >
                            <StyleInputNumber min={0} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                          <Form.Item
                            label="Oe limit:"
                            name="oeLimit"
                            initialValue={100000000}
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Oe limit',
                              },
                            ]}
                          >
                            <StyleInputNumber min={0} />
                          </Form.Item>
                        </Col>
                        <Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
                        <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                          <Form.Item
                            label="Consumption percentage:"
                            name="curPercent"
                            initialValue={5}
                            rules={[
                              {
                                required: true,
                                message: 'Please input your consumption percent',
                              },
                            ]}
                          >
                            <StyleInputNumber min={0} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                          <Form.Item
                            label="Contract name:"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: 'Please select contract name!',
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Please select main contract deployment"
                              allowClear
                            >
                              {Object.entries(deployContractInfo.infos).map(([keyFile, value]) => {
                                return Object.entries(value).map(([keyContract]) => {
                                  const keyComponent = { keyFile, keyContract }
                                  return (
                                    <Option value={JSON.stringify(keyComponent)} key={keyContract}>
                                      {keyContract}
                                    </Option>
                                  )
                                })
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
                        <Col xs={24} sm={9} md={9} lg={9} xl={9}></Col>
                      </Row>
                      <Form.Item>
                        <Row>
                          <Col xs={16} sm={20} md={21} lg={21} xl={22}></Col>
                          <Col xs={6} sm={4} md={3} lg={3} xl={2}>
                            <Button type="primary" htmlType="submit">
                              Deploy
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Form>
                  </div>
                ) : null}
              </Spin>
            </Wrapper>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deployContractInfo: state.deployContract,
    prikeys: state.prikeyManagement,
    login: state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deployContract: (from, contractName, abi, condeStr, feeLimit, curPercent, oeLimit) => {
      dispatch(deployContract(from, contractName, abi, condeStr, feeLimit, curPercent, oeLimit))
    },
    resetDeployContract: () => {
      dispatch(reset())
    },
    upload: (tex) => {
      dispatch(upload(tex))
    },
    compileContract: (contract, version) => {
      dispatch(compileContract(contract, version))
    },
    remove: (name) => {
      dispatch(remove(name))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(DeployContract)

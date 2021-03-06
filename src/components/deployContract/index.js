import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Form, Input, Button, InputNumber, Result, Spin, Select, notification } from 'antd';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import {
    deployContract,
    reset,
    DEPLOY_CONTRACT_SUCCESS,
    DEPLOY_CONTRACT_REQUESTING
} from '../../actions/deployContract';
import { LoadingOutlined} from '@ant-design/icons';

const Header = styled.div`
	text-align: left;
	border-bottom: 5px solid #C23631;
	font-size: 20px;
	text-transform: uppercase;
`;
const SubHeader = styled.div`
	text-align: left;
	font-size: 17px;
`;
const Wrapper = styled.div`
	margin: 1.5% 0% 2% 2%;
`;
const StyleDivider = styled(Divider)`
    margin: 15px 0;
`;
const StyleInputNumber = styled(InputNumber)`
    width: 100%;
`;
const { Option } = Select;

class DeployContract extends Component {
    componentWillUnmount() {
        this.props.resetDeployContract();
    }

    componentDidMount(){
        var {prikeys, login} = this.props;
        if((!prikeys.prikeys&&login.token!=="")||(prikeys.prikeys.length===0&&login.token!=="")){
            notification.warning({
                message: 'Warning!',
                description: "You have no private key, please add somes in private key management to perform transaction!",
            });
        }
    }

    onFinish = (values) => {
        this.props.deployContract(
            values.from,
            values.contractName,
            values.abi,
            values.condeStr,
            values.feeLimit,
            values.curPercent,
            values.oeLimit,
        );
    }
    render() {
        const antIcon = <LoadingOutlined />;
        const { deployContractInfo, login, prikeys } = this.props;
        if(login.token===""){
            return <Redirect to="/login" />
        }
        return (
            <div>
                <Header>Deploy Smart Contract</Header>
                {deployContractInfo.status === DEPLOY_CONTRACT_SUCCESS &&
                    <div>
                        <Result
                            status="success"
                            title={`Your contract has been deplyed successfully!`}
                            subTitle={`You can check it at transaction ${deployContractInfo.tranID}`}
                            extra={[
                                <Button type="primary">
                                    <Link to={`/transaction/${deployContractInfo.tranID}`} >
                                        Details
                                    </Link>
                                </Button>,
                                <Button onClick={() => { this.props.resetDeployContract(); }}>New </Button>,
                            ]}
                        />,
					</div>}
                {deployContractInfo.status !== DEPLOY_CONTRACT_SUCCESS &&
                    <Wrapper>
                        <Spin indicator={antIcon} tip="Processing..."  spinning={deployContractInfo.status === DEPLOY_CONTRACT_REQUESTING}>
                        <Form
                            layout="vertical"
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                        >
                            <SubHeader>Contract Information</SubHeader>
                            <StyleDivider />
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
                                        <Select
                                            showSearch
                                            placeholder="Select a private key"
                                            allowClear
                                        >
                                            {prikeys.prikeys&&prikeys.prikeys.length!==0?prikeys.prikeys.map((value, index) => <Option value={value.prikey} key={index}>{value.name}</Option>):null}
                                        </Select>
                                    </Form.Item>

                                </Col>
                                <Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
                                <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                                    <Form.Item
                                        label="Contract name:"
                                        name="contractName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your contract name!',
                                                min: 2,
                                                max: 30
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={9} md={9} lg={9} xl={9}>

                                    <Form.Item
                                        label="CodeStr:"
                                        name="condeStr"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your CodeStr',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>

                                </Col>
                                <Col xs={0} sm={6} md={6} lg={6} xl={6}></Col>
                                <Col xs={24} sm={9} md={9} lg={9} xl={9}>


                                    <Form.Item
                                        label="Abi:"
                                        name="abi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your abi code',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>


                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={9} md={9} lg={9} xl={9}>
                                    <Form.Item
                                        label="Oe limit:"
                                        name="oeLimit"
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
                                        label="Fee Limit:"
                                        name="feeLimit"
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
                            <Form.Item >
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
                        </Spin>
                    </Wrapper>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deployContractInfo: state.deployContract,
        prikeys:state.prikeyManagement,
        login: state.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deployContract: (
            from,
            contractName,
            abi,
            condeStr,
            feeLimit,
            curPercent,
            oeLimit,) => {
            dispatch(deployContract(
                from,
                contractName,
                abi,
                condeStr,
                feeLimit,
                curPercent,
                oeLimit));
        },
        resetDeployContract: () => {
            dispatch(reset());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(DeployContract);
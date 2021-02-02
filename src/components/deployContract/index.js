import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Divider, Form, Input, Button, InputNumber, Result } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    deployContract,
    reset,
    DEPLOY_CONTRACT_SUCCESS,
} from '../../actions/deployContract';

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

class DeployContract extends Component {
    componentWillUnmount() {
        this.props.resetDeployContract();
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
        const { deployContractInfo } = this.props;
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
                                    <Link to={`/contracts/${deployContractInfo.tranID}`} >
                                        Details
                                    </Link>
                                </Button>,
                                <Button onClick={() => { this.props.resetDeployContract(); }}>New </Button>,
                            ]}
                        />,
					</div>}
                {deployContractInfo.status !== DEPLOY_CONTRACT_SUCCESS &&
                    <Wrapper>
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
                                <Col span={9}>

                                    <Form.Item
                                        label="Address:"
                                        name="from"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your address!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                </Col>
                                <Col span={6}></Col>
                                <Col span={9}>
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
                                <Col span={9}>
                                    <Form.Item
                                        label="Oe limit:"
                                        name="oeLimit"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Oe limit',
                                            },
                                            { 

                                            }
                                        ]}
                                    >
                                        <StyleInputNumber min={0}/>
                                    </Form.Item>

                                </Col>
                                <Col span={6}></Col>

                                <Col span={9}>
                                    <Form.Item
                                        label="Current percent:"
                                        name="curPercent"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your current percent',
                                            },
                                        ]}
                                    >
                                        <StyleInputNumber min={0}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={9}>

                                    <Form.Item
                                        label="CodeStr:"
                                        name="condeStr"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your CodeStr',
                                                max: 1000,
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>

                                </Col>
                                <Col span={6}></Col>
                                <Col span={9}>


                                    <Form.Item
                                        label="Abi:"
                                        name="abi"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your abi code',
                                                max: 1000,
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>


                                </Col>
                            </Row>
                            <Row>
                                <Col span={9}>
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
                                        <StyleInputNumber min={0}/>
                                    </Form.Item>

                                </Col>
                            </Row>
                            <Form.Item >
                                <Row>
                                    <Col span={22}></Col>
                                    <Col span={2}>
                                        <Button type="primary" htmlType="submit">
                                            Deploy
                                    </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Wrapper>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deployContractInfo: state.deployContract,
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
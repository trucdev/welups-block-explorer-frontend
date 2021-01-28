import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Modal, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
    transferAsset,
    TRANSFER_NONE,
    TRANSFER_REQUESTING,
    TRANSFER_SUCCESS,
    TRANSFER_FAIL
} from '../../actions/transferasset';
import { Redirect, Link } from 'react-router-dom';

import ACLogo from '../../assets/images/ACLogo.png';

const { TextArea } = Input;
const ButtonSubmit = styled(Button)`
	width:100%;
    background-color: #C23631;
    border-color: #C23631;
    margin-bottom: 40px;
    color: #FFFFFF;
`;
const Item = styled(Form.Item)`
	font-weight: bold;
`;
const IconContainer = styled.span`
    font-size: 30px;
`;
const Wrapper = styled.div`
    display: flex;
	width:100%;
    height:100%;
    justify-content: center;
    align-items: center;
`;
const Logo = styled.img`
    height: 66px;
    width: 55px;
    margin-bottom: 20px;
`;
const Container = styled.div`
    width:500px;
`;
const Title = styled.span`
    font-size: 25px;
    font-weight: 600;
`;
const ContentTitle = styled.span`
    font-weight: 400;
    margin-left: 7px;
`;
const TitleContainer = styled.div`
    text-align: left;
`;
const HeaderTitle = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledForm = styled(Form)`
    width:450px;
    margin-left: 25px;
`;
const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const { Option } = Select;

class TransferAsset extends React.Component {
    constructor(props) {
        super(props);
        this.changeToAddress = this.changeToAddress.bind(this);
        this.changeAsset = this.changeAsset.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.changePrivateKey = this.changePrivateKey.bind(this);
    }
    state = {
        loading: false,
        visible: false,
        privateKey: "",
        to: "",
        assetName: "ACG",
        amount: ""
    };

    showModal = () => {
        //TODO: invalidate before do transfer
        this.props.transferAsset(this.state.privateKey,
            this.state.to,
            parseInt(this.state.amount),
            this.state.assetName);

    };
    handleOk = () => {
        this.setState({ loading: true });
        // setTimeout(() => {
        //     this.setState({ loading: false, visible: false });
        // }, 3000);
    };
    changeToAddress(event) {
        this.setState((prevState) => ({
            ...prevState,
            to: event.target.value
        }));
    }
    changeAsset(asset) {
        this.setState((prevState) => ({
            ...prevState,
            assetName: asset
        }));
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };

    changeAmount(e) {
        this.setState((prevState) => ({
            ...prevState,
            amount: e.target.value
        }));
    };
    changePrivateKey(e) {
        this.setState((prevState) => ({
            ...prevState,
            privateKey: e.target.value
        }));
    };

    render() {
        // const { visible } = this.state;
        const { transferInfo } = this.props;
        const antIcon = <LoadingOutlined spin />;
        return (
            <Wrapper>
                <Spin indicator={antIcon} tip="Processing..." spinning={transferInfo.status === TRANSFER_REQUESTING}>

                    <Container>
                        <HeaderTitle>
                            <Logo src={ACLogo} />
                            <Title>Transfer Asset</Title>
                        </HeaderTitle>
                        {transferInfo.status === TRANSFER_SUCCESS && <Alert message="Transaction is successed" type="success"
                            description={`Your transaction is ${transferInfo.tranID}`}
                            closable showIcon
                            action={
                                <Link to={`/transaction/${transferInfo.tranID}`} >
                                    Details
                                </Link>
                            }
                        />}
                        {transferInfo.status !== TRANSFER_SUCCESS && <StyledForm
                            layout="vertical"
                            // initialValues={{
                            //     remember: true,
                            // }}
                            size="large"
                        >
                            <TitleContainer>
                                <ContentTitle>Your private Key</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="Key"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill a valid key',
                                    },
                                ]}
                            >
                                <Input
                                    value={this.state.privateKey} onChange={this.changePrivateKey}
                                />
                            </Item>
                            <TitleContainer>
                                <ContentTitle>To</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="toAddress"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill a valid address',
                                    },
                                ]}
                            >
                                <Input
                                    value={this.state.to} onChange={this.changeToAddress}
                                />
                            </Item>
                            <TitleContainer>
                                <ContentTitle>Token</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="Token"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose your asset',
                                    },
                                ]}
                                initialValue="ACG"
                            >
                                <Select
                                    placeholder="Select a token"
                                    allowClear
                                    onChange={this.changeAsset}
                                >
                                    {/* TODO: should use an array to create a list of assets */}
                                    <Option value="ACG">ACG</Option>
                                    {/* <Option value="VNDA">VNDA</Option> */}
                                </Select>
                            </Item>
                            <TitleContainer>
                                <ContentTitle>Amount</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="Amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill a valid number',
                                    },
                                ]}
                            >
                                <Input default={0}
                                    value={this.state.amount} onChange={this.changeAmount}
                                />
                            </Item>

                            <TitleContainer>
                                <ContentTitle>Note</ContentTitle>
                            </TitleContainer>
                            <Item>
                                <TextArea></TextArea>
                            </Item>
                            {/* <SmallItem name="remember" valuePropName="checked"> */}
                            <ButtonSubmit type="submit" disabled={this.state.submitDisabled} htmlType="submit" onClick={this.showModal} >Send</ButtonSubmit>
                            {/* </SmallItem> */}
                            <Modal
                                visible={false}
                                title="Status"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={[
                                ]}
                            >
                                <ModalContent>
                                    <div>
                                        {(() => {
                                            // if (Result = Success) {
                                            //     return (
                                            //         <IconContainer>
                                            //             <CloseCircleOutlined />
                                            //         </IconContainer>
                                            //     )
                                            // } else if (Result = Fail) {
                                            //     return (
                                            //         <IconContainer>
                                            //             <CheckOutlined />
                                            //         </IconContainer>
                                            //     )
                                            // } else
                                            {
                                                return (
                                                    <IconContainer>
                                                        <LoadingOutlined />
                                                    </IconContainer>
                                                )
                                            }
                                        })()}
                                    </div>
                                    <span>
                                        {
                                            // {Result} = Success ? "Success"
                                            // : {Result} = Fail ? "Fail"
                                            //     :
                                            "Processing"}
                                    </span>
                                </ModalContent>

                            </Modal>
                        </StyledForm>}
                    </Container>
                </Spin>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transferInfo: state.transferAsset,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        transferAsset: (fromPrivkey, to, amount, assetName) => {
            dispatch(transferAsset(fromPrivkey, to, amount, assetName));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TransferAsset);
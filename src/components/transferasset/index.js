import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
    transferAsset,
    reset,
    TRANSFER_REQUESTING,
    TRANSFER_SUCCESS} from '../../actions/transferasset';
import { Link } from 'react-router-dom';

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
        privateKey: "",
        to: "",
        assetName: "ACG",
        amount: ""
    };
    componentDidMount(){
        this.props.resetTransferAsset();
    }
    transfer = () => {
        //TODO: invalidate before do transfer
        this.props.transferAsset(this.state.privateKey,
            this.state.to,
            parseInt(this.state.amount),
            this.state.assetName);

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
                        {transferInfo.status === TRANSFER_SUCCESS && 
                        <div>
                                <Alert message="Transaction is successed" type="success"
                                description={`Your transaction is ${transferInfo.tranID}`}
                                closable showIcon
                                action={
                                    <Link to={`/transaction/${transferInfo.tranID}`} >
                                        Details
                                    </Link>
                                }
                            />
                            <br/>
                            <ButtonSubmit onClick={()=>{this.props.resetTransferAsset();}} >New Transaction</ButtonSubmit>
                        </div>}
                        {transferInfo.status !== TRANSFER_SUCCESS && <StyledForm
                            layout="vertical"
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
                            <ButtonSubmit type="submit" disabled={this.state.submitDisabled} htmlType="submit"
                            onClick={this.transfer}>Send</ButtonSubmit>
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
        resetTransferAsset: ()=>{
            dispatch(reset());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TransferAsset);
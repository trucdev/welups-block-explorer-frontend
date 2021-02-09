import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Spin, Result, InputNumber  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
    transferAsset,
    reset,
    TRANSFER_REQUESTING,
    TRANSFER_SUCCESS,
    loadTokens,
    updatePageTokens
} from '../../actions/transferasset';
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
const StyledInputNumber = styled(InputNumber)`
    width: 100%;
`;

const { Option } = Select;

class TransferAsset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privateKey: "",
            to: "",
            assetName: "ACG",
            amount: "",
            loading:false
        };
    }
    componentDidMount() {
        this.props.resetTransferAsset();
        const {transferInfo} = this.props;
        this.props.loadTokens(transferInfo.pageToken.start_item, transferInfo.pageToken.page_limit);
    }
    componentWillUnmount() {
        this.props.resetTransferAsset();
    }
    transfer = () => {
        //TODO: invalidate before do transfer
        this.props.transferAsset(this.state.privateKey,
            this.state.to,
            parseInt(this.state.amount),
            this.state.assetName);

    };
    changeToAddress = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            to: e.target.value
        }));
    }
    changeAsset = (asset) => {
        this.setState((prevState) => ({
            ...prevState,
            assetName: asset
        }));
    }
    changeAmount = (value) => {
        this.setState((prevState) => ({
            ...prevState,
            amount: value
        }));
    };
    changePrivateKey = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            privateKey: e.target.value
        }));
    };
    onScroll = (e)=>{
        var target = e.target;
        var {transferInfo} = this.props;
        if (!this.state.loading && target.scrollTop + target.offsetHeight === target.scrollHeight&&transferInfo.pageToken.start_item<=transferInfo.pageToken.total_items) {
            this.setState({loading: true}, ()=>{
                target.scrollTo(0, target.scrollHeight)
                setTimeout(()=>{
                    this.props.updatePageTokens(); 
                    this.props.loadTokens(transferInfo.pageToken.start_item, transferInfo.pageToken.page_limit);
                },1000)
            })
        }
    }

    render() {
        const { transferInfo } = this.props;
        let assetNames = transferInfo.tokens?transferInfo.tokens:null;
        const antIcon = <LoadingOutlined spin />;
        return (
            <Wrapper>
                <Spin indicator={antIcon} tip="Processing..." spinning={transferInfo.status === TRANSFER_REQUESTING}>
                    {transferInfo.status === TRANSFER_SUCCESS &&
                        <div>
                            <Result
                                status="success"
                                title={`Your transaction has been issued successfully!`}
                                subTitle={`You can check it at transaction ${transferInfo.tranID}`}
                                extra={[
                                    <Button type="primary">
                                        <Link to={`/transaction/${transferInfo.tranID}`} >
                                            Go to details
                                    </Link>
                                    </Button>,
                                    <Button onClick={() => { this.props.resetTransferAsset(); }}>New Transfer</Button>,
                                ]}
                            />,
                        </div>}
                    {transferInfo.status !== TRANSFER_SUCCESS && <Container>
                        <StyledForm
                            layout="vertical"
                            size="large"
                        >
                            <HeaderTitle>
                                <Logo src={ACLogo} />
                                <Title>Transfer Asset</Title>
                            </HeaderTitle>
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
                                        message: 'Please select a token',
                                    },
                                ]}
                                initialValue={assetNames[0]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a token"
                                    allowClear
                                    onChange={this.changeAsset}
                                    onPopupScroll={this.onScroll}
                                >
                                    <Option value="ACG" key="ACG">ACG</Option>
                                    {!this.state.loading ? assetNames.map((value, index) => <Option value={value} key={index}>{value}</Option>):<Option key="loading">Loading...</Option>}
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
                                <StyledInputNumber min={0}
                                     value={this.state.amount} onChange={this.changeAmount}
                                />
                            </Item>

                            <TitleContainer>
                                <ContentTitle>Note</ContentTitle>
                            </TitleContainer>
                            <Item>
                                <TextArea></TextArea>
                            </Item>
                            <ButtonSubmit type="primary" htmlType="submit"
                                onClick={this.transfer}>Send</ButtonSubmit>
                        </StyledForm>
                    </Container>}
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
        resetTransferAsset: () => {
            dispatch(reset());
        },
        loadTokens: (offset, limit) => {
            dispatch(loadTokens(offset, limit));
        },
        updatePageTokens: (page) => {
            dispatch(updatePageTokens(page));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TransferAsset);
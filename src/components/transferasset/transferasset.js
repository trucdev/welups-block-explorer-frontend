import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Modal } from 'antd';
import { CloseCircleOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
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
const SmallItem = styled(Form.Item)`
	margin-bottom: 0px!important;
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
    state = {
        loading: false,
        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    // componentDidMount() {
    //     const { Result } = this.state.result;
    // };


    // getInitialState() {
    //     return {
    //       address: '',
    //       amount: '',
    //       key: '',
    //       addressValid: false,         
    //       amountValid: false, 
    //       keyValid: false,
    //       submitDisabled: true       
    //     }
    //   };
    //   handleChangeText(e) {        
    //     let addressValid = e.target.value ? true : false;       
    //     let submitValid = this.state.addressValid && addressValid 
    //     this.setState({
    //       address: '',
    //       addressValid: addressValid, 
    //       submitDisabled: !submitValid
    //     })
    //   };
    //   handleChangeAmount(e) {        
    //     let amountValid = e.target.value ? true : false;       
    //     let submitValid = this.state.amountValid && amountValid 
    //     this.setState({
    //       text: '',
    //       amountValid: amountValid, 
    //       submitDisabled: !submitValid
    //     })
    //   };
    //   handleChangeKey(e) {         
    //     let keyValid = e.target.value ? true : false;        
    //     let submitValid = this.state.keyValid && keyValid 
    //     this.setState({
    //       key: '',
    //       keyvalid: keyValid, 
    //       submitDisabled: !submitValid
    //     })
    //   };

    render() {
        const { visible, loading } = this.state;
        return (
            <Wrapper>
                <Container>
                    <HeaderTitle>
                        <Logo src={ACLogo} />
                        <Title>Transfer Asset</Title>
                    </HeaderTitle>
                    <StyledForm
                        layout="vertical"
                        initialValues={{
                            remember: true,
                        }}
                        size="large"
                    >
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
                            // value={this.state.adress} onChange={this.handleChangeAddress}
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
                                    message: 'Please enter transaction amount',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a token"
                                allowClear
                            >
                                <Option value="ACG">ACG</Option>
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
                            // value={this.state.amount} onChange={this.handleChangeAmount}
                            />
                        </Item>
                        <TitleContainer>
                            <ContentTitle>Private Key</ContentTitle>
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
                            // value={this.state.key} onChange={this.handleChangeKey}
                            />
                        </Item>
                        <TitleContainer>
                            <ContentTitle>Note</ContentTitle>
                        </TitleContainer>
                        <Item>
                            <TextArea></TextArea>
                        </Item>
                        <SmallItem name="remember" valuePropName="checked">
                            <ButtonSubmit type="submit" disabled={this.state.submitDisabled} htmlType="submit" onClick={this.showModal} >Send</ButtonSubmit>
                        </SmallItem>
                        <Modal
                            visible={visible}
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
                    </StyledForm>
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TransferAsset);
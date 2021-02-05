import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Spin, Result, InputNumber } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
    freezeBalance,
    reset,
    FREEZE_BALANCE_REQUESTING,
    FREEZE_BALANCE_SUCCESS
} from '../../actions/freezeBalance';
import { Link } from 'react-router-dom';

import ACLogo from '../../assets/images/ACLogo.png';

const StyleInputNumber = styled(InputNumber)`
    width: 100%;
`;
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

class FreezeBalance extends React.Component {
    componentDidMount() {
        this.props.reset();
    }
    componentWillUnmount() {
        this.props.reset();
    }
    onFinish = (values) => {
        this.props.freezeBalance(values.from, values.delegate_to, values.frozen_balance, values.resource);
    }

    render() {
        const { freezeBalancee } = this.props;
        const antIcon = <LoadingOutlined spin />;
        return (
            <Wrapper>
                <Spin indicator={antIcon} tip="Processing..." spinning={freezeBalancee.status === FREEZE_BALANCE_REQUESTING}>
                    {freezeBalancee.status === FREEZE_BALANCE_SUCCESS &&
                        <div>
                            <Result
                                status="success"
                                title={`Your transaction has been issued successfully!`}
                                subTitle={`You can check it at transaction ${freezeBalancee.tranID}`}
                                extra={[
                                    <Button type="primary" key="details">
                                        <Link to={`/transaction/${freezeBalancee.tranID}`} >
                                            Go to details
                                    </Link>
                                    </Button>,
                                    <Button onClick={() => { this.props.reset(); }} key="new">Freeze more</Button>,
                                ]}
                            />,
                        </div>}
                    {freezeBalancee.status !== FREEZE_BALANCE_SUCCESS && <Container>
                        <StyledForm
                            layout="vertical"
                            size="large"
                            onFinish = {this.onFinish}
                        >
                            <HeaderTitle>
                                <Logo src={ACLogo} />
                                <Title>Freeze Balance</Title>
                            </HeaderTitle>
                            <TitleContainer>
                                <ContentTitle>Your private Key</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="from"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill a valid key',
                                    },
                                ]}
                            >
                                <Input/>
                            </Item>
                            <TitleContainer>
                                <ContentTitle>To</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="delegate_to"
                            >
                                <Input/>
                            </Item>
                            <TitleContainer>
                                <ContentTitle>Resource</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="resource"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose your resource',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a resource"
                                    allowClear
                                >
                                    <Option value={0} key={0}>BANDWIDTH</Option>
                                    <Option value={1} key={1}>ENERGY</Option>
                                </Select>
                            </Item>
                            <TitleContainer>
                                <ContentTitle>Frozen Balance</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="frozen_balance"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please fill a valid number',
                                    },
                                ]}
                            >
                                <StyleInputNumber/>
                            </Item>
                            <ButtonSubmit type="submit" htmlType="submit">Freeze</ButtonSubmit>
                        </StyledForm>
                    </Container>}
                </Spin>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        freezeBalancee: state.freezeBalance,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        freezeBalance: (privateKey, to, frozenBalance, resource) => {
            dispatch(freezeBalance(privateKey, to, frozenBalance, resource));
        },
        reset: () => {
            dispatch(reset());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(FreezeBalance);
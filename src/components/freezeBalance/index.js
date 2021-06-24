import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Spin, Result, InputNumber, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
    freezeBalance,
    reset,
    FREEZE_BALANCE_REQUESTING,
    FREEZE_BALANCE_SUCCESS,
    FREEZE_BALANCE_FAIL,
    FREEZE_BALANCE_NONE,
} from '../../actions/freezeBalance';
import { Link, Redirect } from 'react-router-dom';

import WUelupsLogo from '../../assets/images/WUelupsLogo.png';

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
    width: 200px;
    margin-bottom: 20px;
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
    @media (min-width: 540px) { 
        width:450px;
    }
    @media (max-width: 450px) { 
        width:250px;
    }
`;


const { Option } = Select;

class FreezeBalance extends React.Component {
    componentDidMount() {
        this.props.reset();
        var { prikeys, login } = this.props;
        if ((!prikeys.prikeys && login.token !== "") || (prikeys.prikeys.length === 0 && login.token !== "")) {
            notification.warning({
                message: 'Warning!',
                description: "You have no private key, please add somes in private key management to perform transaction!",
            });
        }
    }
    componentWillUnmount() {
        this.props.reset();
    }
    onFinish = (values) => {
        this.props.freezeBalance(values.from, values.delegate_to, values.frozen_balance, values.resource);
    }

    render() {
        const { freezeBalancee, login, prikeys } = this.props;
        const antIcon = <LoadingOutlined spin />;
        if (login.token === "") {
            return <Redirect to="/login" />
        }
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
                    {freezeBalancee.status === FREEZE_BALANCE_FAIL &&
                        <div>
                            <Result
                                status="error"
                                title={`Your transaction hasn't been issued, something must went wrong`}
                                extra={[
                                    <Button onClick={() => { this.props.reset(); }}>New Transfer</Button>,
                                ]}
                            />,
                        </div>}
                    {(freezeBalancee.status !== FREEZE_BALANCE_SUCCESS &&freezeBalancee.status !== FREEZE_BALANCE_FAIL) &&
                        <StyledForm
                            layout="vertical"
                            size="large"
                            onFinish={this.onFinish}
                        >
                            <HeaderTitle>
                                <Logo src={WUelupsLogo} />
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
                                <Select
                                    showSearch
                                    placeholder="Select a private key"
                                    allowClear
                                >
                                    {prikeys.prikeys && prikeys.prikeys.length !== 0 ? prikeys.prikeys.map((value, index) => <Option value={value.prikey} key={index}>{value.name}</Option>) : null}
                                </Select>
                            </Item>
                            <TitleContainer>
                                <ContentTitle>To</ContentTitle>
                            </TitleContainer>
                            <Item
                                name="delegate_to"
                            >
                                <Input />
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
                                <StyleInputNumber />
                            </Item>
                            <ButtonSubmit type="submit" htmlType="submit">Freeze</ButtonSubmit>
                        </StyledForm>
                    }
                </Spin>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        freezeBalancee: state.freezeBalance,
        prikeys: state.prikeyManagement,
        login: state.login,
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
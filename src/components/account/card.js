import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';
import { loadAccountDetails } from '../../actions/account';
import ReactJson from 'react-json-view';
import { Skeleton} from 'antd';
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
const CardContent = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
    border-bottom: 1px solid #EEEEEE;
    padding-top: 10px;
    padding-bottom: 10px;
`;
const Content = styled.div`
    padding-left: 25px;
    padding-right: 25px;
    background-color: #ffffff;
    width: 100%;
`;
const CardHeader = styled.div`
    text-align: left;
    min-width: 140px;
    font-weight: 600;
`;
const RowTitle = styled.div`
  min-width: 140px;
  text-align: left;
`;
const RowValue = styled.div`
  text-align: left;
  overflow: auto;
`;

const HightLight= styled.span`
  color: '#E50915';
`;

class Card extends Component {
  componentDidMount(){
    this.props.loadAccountDetails(this.props.addr);
  }
  render() {
    
    const acc= this.props.account;
    const content = [
      { title: 'Name', value:<HightLight>{ acc.name} TRX</HightLight> },
      { title: 'Total Balance', value:<HightLight>{ acc.totalBalance} TRX</HightLight> },
      { title: 'TRX Balance',  value: acc.trxBalance},
      { title: 'Transactions',  value: acc.transactions},
      { title: 'Transferred',  value: acc.transferred},
      { title: 'Available Balance',  value: acc.availableBalance},
      { title: 'Net Usage',  value: acc.netUsage},
      { title: 'Bandwidth  Used',  value: acc.bandwidthUsed},
      { title: 'BandWidth Total',  value: acc.bandwidthTotal},
      { title: 'Create Time',  value: acc.createTime},
      { title: 'Frozen Balance',  value: acc.frozenBalance},
      { title: 'Energy Total',  value: acc.energyTotal},
      { title: 'Energy Used',  value: acc.energyUsed},
      // { title: 'Assets', value: <ReactJson src={ acc.asset} />},
    ];
    return (
      <Wrap>
        <Skeleton  loading={acc.address===""}>
        <Content>
          <CardContent>
            <CardHeader>Address: <span>{acc.address} <CopyOutlined /> </span></CardHeader>
          </CardContent>
          {content.map((item,index) => {
            return (
              <CardContent key ={index}>
                <RowTitle >{item.title}:</RowTitle>
                <RowValue>{item.value}</RowValue>
              </CardContent>
            )
          })}
        </Content>
        </Skeleton>
      </Wrap>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = dispatch => {
	return {
		loadAccountDetails: (addr) => {
			dispatch(loadAccountDetails(addr));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Card);

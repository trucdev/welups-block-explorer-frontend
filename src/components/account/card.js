import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';
import { loadAccountDetails } from '../../actions/account';
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
const RowValueExt = styled.div`
  height: auto; 
  max-height: 100px;
`;
const StatusContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
const StatusConfirm = styled.div`
    background-color: #E1F3E0;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 15px;
`;

const RowTitleUpper = styled.div`
  min-width: 100px;
  text-align: left;
  text-transform: uppercase;
`;
const HightLight= styled.span`
  color: '#E50915';
`;
// address: "",
//     totalBalance: 0,
//     trxBalance: 0,
// 	createdTime: 0,
// 	freezeBalance: 0,
// 	bandwidthLimit: 0,
// 	usedBandwidth: 0,
// 	energy:0,


class Card extends Component {
  componentDidMount(){
    this.props.loadAccountDetails(this.props.addr);
  }
  render() {
    const acc= this.props.account;
    const content = [
      { title: 'Total Balance', value:<HightLight>{ acc.totalBalance} TRX</HightLight> },
      { title: 'Trx Balance', value:<HightLight>{ acc.trxBalance} TRX</HightLight> },
      { title: 'Created Time',  value: new Date(acc.createdTime).toString()},
      { title: 'Freeze Balance',  value: acc.freezeBalance},
      { title: 'Bandwidth Limit',  value: acc.bandwidthLimit},
      { title: 'Used Bandwidth',  value: acc.usedBandwidth},
      { title: 'Energy',  value: acc.energy},
    ];
    return (
      <Wrap>
        <Content>
          <CardContent>
            <CardHeader>Address: <span>{acc.address} <CopyOutlined /> </span></CardHeader>
          </CardContent>
          {content.map((item,index) => {
            return (<CardContent key ={index}>
              <RowTitle >{item.title}:</RowTitle>
              <RowValue>{item.value}</RowValue>
            </CardContent>)
          })}
        </Content>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';
import { loadTransactionDetails } from '../../actions/transaction';
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
    min-width: 100px;
    font-weight: 600;
`;
const RowTitle = styled.div`
  min-width: 100px;
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
const StatusBlockNum = styled.div`
    background-color: #DDDDDD;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 15px;
`;

const RowTitleUpper = styled.div`
  min-width: 100px;
  text-align: left;
  text-transform: uppercase;
`;
const Status = (status, numOfBlocks) => (<StatusContainer>
  <StatusConfirm>
    <RowTitleUpper>{status}</RowTitleUpper>
  </StatusConfirm>
  <StatusBlockNum>
    <RowValue>confirmed by {numOfBlocks} blocks</RowValue>
  </StatusBlockNum>
</StatusContainer>);
const HightLight= styled.span`
color: '#E50915';
`;


class Card extends Component {
  componentDidMount(){
    this.props.loadTransactionDetails(this.props.txHash);
  }
  render() {
    const { hash, result, status, blockNum, timestamp, numOfBlocks, contract}= this.props.transaction;
    const content = [
      { title: 'Result', value:result },
      { title: 'Status', value: Status(status,numOfBlocks)},
      { title: 'Block', value: <HightLight>{blockNum}</HightLight> },
      { title: 'Time', value: new Date(timestamp).toString() },
      { title: 'Contract', value: contract.type},
      { title: 'Type URL', value: contract.parameter.type_url },
      { title: 'Value', value: <RowValueExt>{contract.parameter.value}</RowValueExt> },
      // { title: 'Extracted Raw', value: <ReactJson src={contract.parameter.raw} />},
    ];
    return (
      <Wrap>
         <Skeleton loading={hash===""}>
        <Content>
          <CardContent>
            <CardHeader>Hash: <span>{hash} <CopyOutlined /> </span></CardHeader>
          </CardContent>
          {content.map((item,index) => {
            return (
            <CardContent key ={index} >
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
    transaction: state.transaction,
  };
};
const mapDispatchToProps = dispatch => {
	return {
		loadTransactionDetails: (txHash) => {
			dispatch(loadTransactionDetails(txHash));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Card);

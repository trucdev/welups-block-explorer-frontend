import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CopyOutlined } from '@ant-design/icons'
import { Skeleton } from 'antd'
import { toDateTime } from '../../utils/utils'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const CardContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
  border-bottom: 1px solid #eeeeee;
  padding-top: 10px;
  padding-bottom: 10px;
`
const Content = styled.div`
  padding-left: 25px;
  padding-right: 25px;
  background-color: #ffffff;
  width: 100%;
`
const CardHeader = styled.div`
  text-align: left;
  min-width: 100px;
  font-weight: 600;
`
const RowTitle = styled.div`
  min-width: 100px;
  text-align: left;
`
const RowValue = styled.div`
  text-align: left;
  overflow: auto;
`
const RowValueExt = styled.div`
  height: auto;
  max-height: 100px;
`
const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const StatusConfirm = styled.div`
  padding-right: 5px;
  margin-right: 15px;
`
const StatusBlockNum = styled.div`
  background-color: #dddddd;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 15px;
`

const RowTitleUpperGreen = styled.div`
  background-color: #e1f3e0;
  min-width: 70px;
  text-align: left;
  text-transform: uppercase;
  padding-left: 5px;
  padding-right: 5px;
`
const RowTitleUpperRed = styled.div`
  background-color: #ff7677;
  min-width: 100px;
  text-align: left;
  text-transform: uppercase;
  padding-left: 5px;
  padding-right: 5px;
`
const Status = (confirmed, numOfBlocks) => (
  <StatusContainer>
    <StatusConfirm>
      {confirmed === true ? (
        <RowTitleUpperGreen>CONFIRMED</RowTitleUpperGreen>
      ) : (
        <RowTitleUpperRed>UNCONFIRMED</RowTitleUpperRed>
      )}
    </StatusConfirm>
    <StatusBlockNum>
      <RowValue>confirmed by {numOfBlocks} blocks</RowValue>
    </StatusBlockNum>
  </StatusContainer>
)
const HightLight = styled.span`
  color: '#E50915';
`

class Card extends Component {
  render() {
    const { hash, contract, blockNum, result, timestamp, numOfBlocks, confirmed } =
      this.props.transaction
    const content = [
      { title: 'Result', value: result === 'SUCESS' ? 'SUCCESS' : 'FAILED' },
      { title: 'Status', value: Status(confirmed, numOfBlocks) },
      { title: 'Block', value: <HightLight>{blockNum}</HightLight> },
      { title: 'Time', value: toDateTime(timestamp ? timestamp : 0) },
      { title: 'Contract', value: contract.type },
    ]
    return (
      <Wrap>
        <Skeleton loading={hash === ''}>
          <Content>
            <CardContent>
              <CardHeader>
                Hash:{' '}
                <span>
                  {hash} <CopyOutlined />{' '}
                </span>
              </CardHeader>
            </CardContent>
            {content.map((item, index) => {
              return (
                <CardContent key={index}>
                  <RowTitle>{item.title}:</RowTitle>
                  <RowValue>{item.value}</RowValue>
                </CardContent>
              )
            })}
          </Content>
        </Skeleton>
      </Wrap>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Card)

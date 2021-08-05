import React from 'react'
import { List } from 'antd'
import { BlockOutlined } from '@ant-design/icons'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { connect } from 'react-redux'
import { loadRecentTrans } from '../../actions/home'
import { Row, Col } from 'antd'
import { GLOBAL_SYMBOL } from '../../constant'
import {
  RecentListTitleFrame,
  RecentListTitle,
  RecentListContentFrame,
  RecentItem,
  RecentItemData,
  StyledLink,
  RecentRightCol,
  RecentListContainer,
  RecentItemContainer,
  TimeAgo,
  RecentItemReward,
  AssetName,
} from './recent-list'
import { toTimeAgo, currencyFormat, decimalFormat } from '../../utils/utils'

class TransactionList extends React.Component {
  componentDidMount() {
    this.props.loadRecentTrans()
  }
  tranItem = (tran) => {
    var amount = null
    const contractType = tran.contract.type
    switch (contractType) {
      default:
        amount = null
        break
      case 'TransferContract':
        amount = currencyFormat(decimalFormat(tran.contract.parameter.raw.amount / 1000000))
        break
      case 'TransferAssetContract':
        amount = currencyFormat(
          tran.contract.parameter.raw.amount / 10 ** tran.contract.parameter.raw.precision
        )
        break
    }
    return (
      <>
        <RecentItemContainer key={tran.hash}>
          <RecentItem>
            <Row>
              <Col span={12}>
                <span>
                  Transaction:{' '}
                  <RecentItemData>
                    <StyledLink to={`/transaction/${tran.hash}`} target="_blank">
                      {tran.hash.substring(0, 15) + '...'}
                    </StyledLink>
                  </RecentItemData>
                </span>
                <br />
                <span>
                  Type:<RecentItemData>{tran.contract.type}</RecentItemData>
                </span>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    {tran.contract.type === 'TransferAssetContract' ||
                    (tran.contract.type === 'TransferContract' &&
                      tran.contract.parameter.raw.owner_address &&
                      tran.contract.parameter.raw.to_address) ? (
                      <div>
                        <span>From: </span>
                        <StyledLink
                          to={'/account/' + tran.contract.parameter.raw.owner_address}
                          target="_blank"
                        >
                          {tran.contract.parameter.raw.owner_address.substring(0, 7) +
                            '...' +
                            tran.contract.parameter.raw.owner_address.substring(
                              tran.contract.parameter.raw.owner_address.length - 4,
                              tran.contract.parameter.raw.owner_address.length - 1
                            )}
                        </StyledLink>
                        <br />
                        <span> To: </span>
                        <StyledLink
                          to={'/account/' + tran.contract.parameter.raw.to_address}
                          target="_blank"
                        >
                          {tran.contract.parameter.raw.to_address.substring(0, 7) +
                            '...' +
                            tran.contract.parameter.raw.to_address.substring(
                              tran.contract.parameter.raw.to_address.length - 4,
                              tran.contract.parameter.raw.to_address.length - 1
                            )}
                        </StyledLink>
                      </div>
                    ) : (
                      <br></br>
                    )}
                  </Col>
                  <Col span={12} className="text-right">
                    <span>
                      <RecentItemReward>{amount} </RecentItemReward>
                      {tran.contract.type === 'TransferAssetContract' ? (
                        <StyledLink
                          to={`/token/${tran.contract.parameter.raw.asset_id}`}
                          target="_blank"
                        >
                          {tran.contract.parameter.raw.asset_name}
                        </StyledLink>
                      ) : null}
                      {contractType === 'TransferContract' ? (
                        <AssetName>{GLOBAL_SYMBOL}</AssetName>
                      ) : null}
                    </span>
                    <br />
                    <TimeAgo>{tran.timestamp ? toTimeAgo(tran.timestamp) : 'unknown'}</TimeAgo>
                  </Col>
                </Row>
              </Col>
            </Row>
          </RecentItem>
        </RecentItemContainer>
      </>
    )
  }
  render() {
    let trans = this.props.trans == null ? [] : this.props.trans
    trans.sort(function (a, b) {
      return b.timestamp - a.timestamp
    })
    return (
      <RecentListContainer>
        <RecentListTitleFrame>
          <RecentListTitle>Recent Transactions</RecentListTitle>
        </RecentListTitleFrame>
        <RecentListContentFrame>
          <PerfectScrollbar>
            <List
              dataSource={trans}
              renderItem={(tran) => this.tranItem(tran)}
              loading={trans.length === 0 ? true : false}
              locale={{ emptyText: 'Loading' }}
            />
          </PerfectScrollbar>
        </RecentListContentFrame>
      </RecentListContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trans: state.homeTrans.trans,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadRecentTrans: () => {
      dispatch(loadRecentTrans())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(TransactionList)

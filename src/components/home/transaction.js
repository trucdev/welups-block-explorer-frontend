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
        amount =
          currencyFormat(decimalFormat(tran.contract.parameter.raw.amount / 1000000)) +
          ' ' +
          GLOBAL_SYMBOL
        break
      case 'TransferAssetContract':
        amount = currencyFormat(tran.contract.parameter.raw.amount)
        break
    }
    return (
      <List.Item key={tran.hash}>
        <RecentItem>
          <Row>
            <Col xs={24} sm={24} md={12}>
              <span>
                Transaction:
                <RecentItemData>
                  <StyledLink to={`/transaction/${tran.hash}`} target="_blank">
                    {tran.hash.substring(0, 24) + '...'}
                  </StyledLink>
                </RecentItemData>
              </span>
            </Col>
            <RecentRightCol xs={24} sm={24} md={12}>
              <span>
                <RecentItemData>
                  {amount}&nbsp;
                  {tran.contract.type === 'TransferAssetContract' ? (
                    <StyledLink
                      to={`/token/${tran.contract.parameter.raw.AssetID}`}
                      target="_blank"
                    >
                      {tran.contract.parameter.raw.AssetName}
                    </StyledLink>
                  ) : null}
                </RecentItemData>
              </span>
            </RecentRightCol>
          </Row>
          <Row>
            <Col xs={0} sm={0} md={24}>
              {tran.contract.type === 'TransferAssetContract' ||
              (tran.contract.type === 'TransferContract' &&
                tran.contract.parameter.raw.owner_address &&
                tran.contract.parameter.raw.to_address) ? (
                <div>
                  <span>From </span>
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
                  <span> To </span>
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
          </Row>

          <Row>
            <Col xs={24} sm={24} md={12}>
              <span>
                Type:<RecentItemData>{tran.contract.type}</RecentItemData>
              </span>
            </Col>
            <RecentRightCol xs={24} sm={24} md={12}>
              <span>
                <RecentItemData>
                  {tran.timestamp ? toTimeAgo(tran.timestamp) : 'unknown'}
                </RecentItemData>
              </span>
            </RecentRightCol>
          </Row>
        </RecentItem>
      </List.Item>
    )
  }
  render() {
    let trans = this.props.trans == null ? [] : this.props.trans
    trans.sort(function (a, b) {
      return b.timestamp - a.timestamp
    })
    return (
      <div>
        <RecentListTitleFrame>
          <BlockOutlined />
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
      </div>
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

import React from 'react'
import { List, Card } from 'antd'
import { BlockOutlined } from '@ant-design/icons'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { connect } from 'react-redux'
import { loadRecentBlocks } from '../../actions/home'
import { Row, Col } from 'antd'
import {
  RecentListTitleFrame,
  RecentListTitle,
  RecentListContentFrame,
  RecentItem,
  RecentItemData,
  StyledLink,
  RecentListContainer,
  RecentItemContainer,
  RecentItemReward,
  TimeAgo,
} from './recent-list'
import { toTimeAgo } from '../../utils/utils'

class BlockList extends React.Component {
  componentDidMount() {
    this.props.loadRecentBlocks()
  }
  blockItem = (block) => {
    return (
      <RecentItemContainer key={block.num}>
        <RecentItem>
          <Row>
            <Col span={8}>
              <Row>
                <Col>
                  <span>
                    Block:{' '}
                    <RecentItemData>
                      <StyledLink to={`/block/${block.num}`}>{block.num}</StyledLink>
                    </RecentItemData>
                  </span>
                  <br />
                  <span>
                    Include: <RecentItemData>{block.num_of_txs}</RecentItemData> transactions
                  </span>
                </Col>
                <Col></Col>
              </Row>
            </Col>
            <Col span={8} className="text-center">
              <span>
                Block reward: <RecentItemReward>{16}</RecentItemReward>
              </span>
            </Col>
            <Col span={8} className="text-right">
              <span>
                Producer:{' '}
                <RecentItemData>
                  <StyledLink to={`/account/${block.witness_address}`} bold>
                    {block.witness_name ? block.witness_name : block.witness_address}
                  </StyledLink>
                </RecentItemData>
              </span>
              <br />
              <span>
                <TimeAgo>{block.timestamp ? toTimeAgo(block.timestamp) : 'unknown'}</TimeAgo>
              </span>
            </Col>
          </Row>
        </RecentItem>
      </RecentItemContainer>
    )
  }
  render() {
    let blocks = this.props.blocks ?? []
    blocks.sort(function (a, b) {
      return b.num - a.num
    })
    return (
      <RecentListContainer>
        <RecentListTitleFrame>
          <RecentListTitle>Recent Blocks</RecentListTitle>
        </RecentListTitleFrame>
        <RecentListContentFrame>
          <PerfectScrollbar>
            <List
              className="list-blocks"
              dataSource={blocks}
              loading={blocks.length === 0 ? true : false}
              locale={{ emptyText: 'Loading' }}
              renderItem={(block) => this.blockItem(block)}
            />
          </PerfectScrollbar>
        </RecentListContentFrame>
      </RecentListContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blocks: state.homeBlocks.blocks,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadRecentBlocks: () => {
      dispatch(loadRecentBlocks())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(BlockList)

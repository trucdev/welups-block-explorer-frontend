import React from 'react'
import { Table, Pagination, Badge } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadBlocks, updatePageBlocks, updatePageBlocksLimit } from '../../actions/blocks'
import styled from 'styled-components'
import { toTimeAgo } from '../../utils/utils'
import PageHeader from '../partials/pageHeader'

const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: #c23631;
  }
`
const Wrapper = styled.div`
  margin: 5px;
`
const Pagin = styled.div`
  margin-top: 15px;
  text-align: right !important;
`
const BadgeGreen = styled(Badge)`
  .ant-badge-count {
    background-color: #e1f3e0;
    color: black;
  }
`

const BadgeRed = styled(Badge)`
  .ant-badge-count {
    background-color: #ff7677;
    color: black;
  }
`

class BlockTable extends React.Component {
  componentDidMount() {
    var { pageBlocks } = this.props
    this.props.loadBlocks(pageBlocks.start_item, pageBlocks.page_limit)
  }

  onChange = (pageNumber, pageLimit) => {
    var { pageBlocks } = this.props
    if (pageNumber !== pageBlocks.current_page) {
      this.props.updatePageBlocks(pageNumber)
    }
    if (pageLimit !== pageBlocks.page_limit) {
      this.props.updatePageBlocksLimit(pageLimit)
    }
    this.props.loadBlocks(pageBlocks.start_item + 1, pageLimit)
  }

  render() {
    var { blocks, pageBlocks } = this.props
    const columns = [
      {
        title: 'No.',
        key: 'no',
        render: (value, item, index) =>
          index + 1 + (pageBlocks.current_page - 1) * pageBlocks.page_limit,
        fixed: 'left',
        width: 70,
      },
      {
        title: 'Height',
        dataIndex: 'num',
        key: 'height',
        render: (text) => (
          <StyledLink key={text} to={'/block/' + text}>
            {text}
          </StyledLink>
        ),
      },
      {
        title: 'Age',
        key: 'age',
        render: (record) => {
          var time = record.timestamp ? toTimeAgo(record.timestamp) : 'unknown'
          return time
        },
      },
      {
        title: 'Status',
        key: 'status',
        render: (record) => {
          var status = record.confirmed ? (
            <BadgeGreen count="CONFIRMED" />
          ) : (
            <BadgeRed count="UNCOMFIRMED" />
          )
          return status
        },
      },
      {
        title: 'Transactions',
        dataIndex: 'num_of_txs',
        key: 'transactions',
        render: (text) => <span>{text}</span>,
      },
      {
        title: 'Producer',
        key: 'producer',
        render: (record) => (
          <StyledLink key={record.witness_name} to={`/account/${record.witness_address}`}>
            {record.witness_name}
          </StyledLink>
        ),
      },
    ]
    return (
      <Wrapper>
        <PageHeader>List of Blocks</PageHeader>
        <Table
          columns={columns}
          dataSource={blocks}
          rowKey="num"
          scroll={{ x: 1300 }}
          sticky
          pagination={false}
          loading={blocks && blocks.length === 0 ? true : false}
          locale={{ emptyText: 'Loading' }}
        />
        <Pagin>
          <Pagination
            current={pageBlocks.start_page}
            total={pageBlocks.total_items}
            onChange={this.onChange}
            showSizeChanger
            showQuickJumper
          />
        </Pagin>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blocks: state.blocks,
    pageBlocks: state.pageBlocks,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updatePageBlocks: (page) => {
      dispatch(updatePageBlocks(page))
    },
    updatePageBlocksLimit: (limit) => {
      dispatch(updatePageBlocksLimit(limit))
    },
    loadBlocks: (offset, limit) => {
      dispatch(loadBlocks(offset, limit))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BlockTable)

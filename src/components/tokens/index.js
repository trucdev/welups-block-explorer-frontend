import React from 'react'
import { Table, Pagination } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadTokens, updatePageTokens, updatePageTokensLimit } from '../../actions/tokens'
import styled from 'styled-components'
import { currencyFormat } from '../../utils/utils'

const LeftHeader = styled.div`
  text-align: left;
  border-bottom: 5px solid #c23631;
  font-size: 20px;
  text-transform: uppercase;
`
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

class TokenTable extends React.Component {
  componentDidMount() {
    const { pageTokens } = this.props
    this.props.loadTokens(pageTokens.start_item, pageTokens.page_limit)
  }

  onChange = (pageNumber, pageLimit) => {
    this.props.updatePageTokens(pageNumber)
    var { pageTokens } = this.props
    if (pageLimit !== pageTokens.page_limit) {
      this.props.updatePageTokensLimit(pageLimit)
    }
    this.props.loadTokens(pageTokens.start_item, pageTokens.page_limit)
  }

  render() {
    var { tokens, pageTokens } = this.props
    const columns = [
      {
        title: 'No.',
        key: 'no',
        render: (value, item, index) =>
          index + 1 + (pageTokens.current_page - 1) * pageTokens.page_limit,
        fixed: 'left',
        width: 70,
      },
      {
        title: 'ID',
        key: 'id',
        render: (record) => (
          <StyledLink key={record.id} to={`/token/${record.id}`}>
            {record.id}
          </StyledLink>
        ),
        width: 160,
      },
      {
        title: 'Name',
        key: 'name',
        render: (record) => (
          <StyledLink key={record.name} to={`/token/${record.id}`}>
            {record.name}
          </StyledLink>
        ),
      },
      {
        title: 'Abbreviation',
        render: (record) => (
          <StyledLink key={record.abbr} to={`/token/${record.id}`}>
            {record.abbr}
          </StyledLink>
        ),
        key: 'abbr',
      },
      {
        title: 'Total Supply',
        dataIndex: 'total_supply',
        key: 'total_supply',
        render: (record, token) => {
          var text = record ? currencyFormat(record / 10 ** token.precision) : null
          return text
        },
      },
    ]
    return (
      <Wrapper>
        <LeftHeader>List of WRC10 Tokens</LeftHeader>
        <Table
          columns={columns}
          dataSource={tokens}
          rowKey="id"
          scroll={{ x: 1300 }}
          sticky
          pagination={false}
          loading={tokens !== null ? (tokens.length === 0 ? true : false) : false}
          locale={{ emptyText: 'Loading' }}
        />
        <Pagin>
          <Pagination
            current={pageTokens.start_page}
            total={pageTokens.total_items}
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
    tokens: state.tokens,
    pageTokens: state.pageTokens,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadTokens: (offset, limit) => {
      dispatch(loadTokens(offset, limit))
    },
    updatePageTokens: (page) => {
      dispatch(updatePageTokens(page))
    },
    updatePageTokensLimit: (limit) => {
      dispatch(updatePageTokensLimit(limit))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TokenTable)

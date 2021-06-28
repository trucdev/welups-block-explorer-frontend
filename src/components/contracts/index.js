import React from 'react'
import { Table, Pagination } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  loadContracts,
  updatePageContracts,
  updatePageContractsLimit,
} from '../../actions/contracts'
import styled from 'styled-components'

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

class ContractTable extends React.Component {
  componentDidMount() {
    const { contracts } = this.props
    this.props.loadContracts(contracts.contractPage.start_item, contracts.contractPage.page_limit)
  }

  onChange = (pageNumber, pageLimit) => {
    this.props.updatePageContracts(pageNumber)
    var { contracts } = this.props
    if (pageLimit !== contracts.contractPage.page_limit) {
      this.props.updatePageContractsLimit(pageLimit)
    }
    this.props.loadContracts(contracts.contractPage.start_item, contracts.contractPage.page_limit)
  }

  render() {
    var { contracts } = this.props
    const columns = [
      {
        title: 'No.',
        key: 'no',
        render: (value, item, index) =>
          index + 1 + (contracts.contractPage.current_page - 1) * contracts.contractPage.page_limit,
        fixed: 'left',
        width: 70,
      },
      {
        title: 'Contract address',
        dataIndex: 'addr',
        key: 'addr',
        render: (text) => (
          <StyledLink key={text} to={`/contract/${text}`}>
            {text}
          </StyledLink>
        ),
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Owner Address',
        dataIndex: 'owner_addr',
        render: (text) => (
          <StyledLink key={text} to={`/account/${text}`}>
            {text}
          </StyledLink>
        ),
        key: 'owner_addr',
      },
    ]
    return (
      <Wrapper>
        <LeftHeader>List of WRC10 CONTRACTS</LeftHeader>
        <Table
          columns={columns}
          dataSource={contracts.contracts}
          rowKey="addr"
          scroll={{ x: 1300 }}
          sticky
          pagination={false}
          loading={
            contracts.contracts !== null ? (contracts.contracts.length === 0 ? true : false) : false
          }
          locale={{ emptyText: 'Loading' }}
        />
        <Pagin>
          <Pagination
            current={contracts.contractPage.start_page}
            total={contracts.contractPage.total_items}
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
    contracts: state.contracts,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updatePageContracts: (page) => {
      dispatch(updatePageContracts(page))
    },
    updatePageContractsLimit: (limit) => {
      dispatch(updatePageContractsLimit(limit))
    },
    loadContracts: (offset, limit) => {
      dispatch(loadContracts(offset, limit))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  ContractTable
)

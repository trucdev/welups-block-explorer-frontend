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
import PageHeader from '../partials/pageHeader'

const StyledLink = styled(Link)``

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
        width: 60,
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
        width: 80,
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
        <PageHeader>List of WRC20 contracts</PageHeader>
        <Table
          columns={columns}
          dataSource={contracts.contracts}
          rowKey="addr"
          scroll={{ x: 800 }}
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

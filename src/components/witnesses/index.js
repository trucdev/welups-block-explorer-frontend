import React from 'react'
import { Table, Tag } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadWitnesses } from '../../actions/witnesses'
import styled from 'styled-components'
import PageHeader from '../partials/pageHeader'

const StyleOutLink = styled.a``
const StyledLink = styled(Link)``
const Wrapper = styled.div``
const columns = [
  {
    title: 'No.',
    key: 'no',
    render: (value, item, index) => index + 1,
    width: 60,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 115,
    render: (text) => (
      <StyledLink key={text} to={`/account/${text}`}>
        {text.substring(0, 4) + '...' + text.substring(30, 33)}
      </StyledLink>
    ),
  },
  {
    title: 'Vote Count',
    dataIndex: 'vote_count',
    key: 'vote_count',
    width: 90,
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    render: (text) => (
      <StyleOutLink key={text} href={text}>
        {text}
      </StyleOutLink>
    ),
  },
  {
    title: 'Total Produced',
    key: 'total_produced',
    dataIndex: 'total_produced',
    width: 100,
  },
  {
    title: 'Total Missed',
    key: 'total_missed',
    dataIndex: 'total_missed',
    width: 80,
    render: (text) => <span>{text ? text : 0}</span>,
  },
  {
    title: 'Lastest block num',
    key: 'lastest_block_num',
    dataIndex: 'lastest_block_num',
    width: 110,
    render: (text) => (
      <StyledLink key={text} to={`/block/${text}`}>
        {text}
      </StyledLink>
    ),
  },
  {
    title: 'Lastest Slot Num',
    key: 'lastest_slot_num',
    dataIndex: 'lastest_slot_num',
  },
  {
    title: 'Running',
    key: 'is_jobs',
    dataIndex: 'is_jobs',
    width: 90,
    render: (text) => <Tag color={text ? 'green' : 'red'}>{text ? 'RUNNING' : 'NOT RUNNING'}</Tag>,
  },
]

class WitnessTable extends React.Component {
  componentDidMount() {
    this.props.loadWitnesses()
  }
  render() {
    const witnesses = this.props.witnesses
    return (
      <Wrapper>
        <PageHeader>List of Witness</PageHeader>
        <Table
          columns={columns}
          dataSource={witnesses}
          rowKey="address"
          scroll={{ x: 1000 }}
          loading={witnesses !== null ? (witnesses.length === 0 ? true : false) : false}
          locale={{ emptyText: 'Loading' }}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    witnesses: state.witnesses,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadWitnesses: () => {
      dispatch(loadWitnesses())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  WitnessTable
)

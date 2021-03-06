import React from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { loadNodes } from '../../actions/nodes'
import styled from 'styled-components'
import PageHeader from '../partials/pageHeader'

const Wrapper = styled.div`
  margin: 5px;
`

const columns = [
  {
    title: 'No.',
    key: 'no',
    render: (value, item, index) => index + 1,
    fixed: 'left',
    width: 70,
  },
  {
    title: 'Host',
    key: 'host',
    dataIndex: 'host',
  },
  {
    title: 'Port',
    key: 'port',
    dataIndex: 'port',
  },
]

class NodeTable extends React.Component {
  componentDidMount() {
    this.props.loadNodes()
  }
  render() {
    const { nodes } = this.props
    return (
      <Wrapper>
        <PageHeader>List of Nodes</PageHeader>
        <Table
          columns={columns}
          dataSource={nodes}
          rowKey="host"
          loading={nodes !== null ? (nodes.length === 0 ? true : false) : false}
          locale={{ emptyText: 'Loading' }}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadNodes: () => {
      dispatch(loadNodes())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(NodeTable)

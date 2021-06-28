import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableRow, Th } from './style'
import { toDateTime } from '../../utils/utils'

class BlockTime extends Component {
  render() {
    let { time } = this.props

    return (
      <TableRow>
        <Th>
          <span>Time</span>:
        </Th>
        <td>
          <div>
            <span>{time ? toDateTime(time) : 'unknown'}</span>
          </div>
        </td>
      </TableRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    time: state.block.time,
  }
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockTime)

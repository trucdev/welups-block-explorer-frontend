import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TableRow, Th } from './style'

class BlockSize extends Component {
  render() {
    let { size } = this.props

    return (
      <TableRow>
        <Th>
          <span>Size</span>:
        </Th>
        <td>
          <div>
            <span>{size}&nbsp;Bytes</span>
          </div>
        </td>
      </TableRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.block.size,
  }
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockSize)

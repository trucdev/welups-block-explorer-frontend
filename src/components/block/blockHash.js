import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CopyOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { TableRow, Th } from './style'

class BlockHash extends Component {
  render() {
    let { block_hash } = this.props

    return (
      <TableRow>
        <Th>
          <span>Hash</span>:
        </Th>
        <td>
          <div>
            <span>
              {block_hash}
              <CopyToClipboard text={block_hash}>
                <CopyOutlined />
              </CopyToClipboard>
            </span>
          </div>
        </td>
      </TableRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    block_hash: state.block.block_hash,
  }
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockHash)

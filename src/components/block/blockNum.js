import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const BlockNumStyled = styled.span`
  font-weight: normal;
`

class BlockNum extends Component {
  render() {
    let { block_num } = this.props
    return <BlockNumStyled>#{block_num}</BlockNumStyled>
  }
}

const mapStateToProps = (state) => {
  return {
    block_num: state.block.block_num,
  }
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(BlockNum)

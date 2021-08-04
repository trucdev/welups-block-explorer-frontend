import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'

const BodyWrapper = styled(Row)`
  background: #f6f7fb;
`

export default function Body({ children }) {
  return (
    <Col span={24}>
      <BodyWrapper justify="center" gutter={[0, 0]}>
        <Col xs={20} sm={20} md={20} lg={19} xl={18}>
          {children}
        </Col>
      </BodyWrapper>
    </Col>
  )
}

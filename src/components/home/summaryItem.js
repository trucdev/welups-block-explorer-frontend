import { Col, Row, Grid } from 'antd'
import React from 'react'
import styled from 'styled-components'

const SummaryItemContainer = styled(Row)`
  border-${(props) => (props.horizontal ? 'right' : 'bottom')}: ${(props) =>
  props.last ? 'none' : '1px solid #D6D6D6'};
  padding-top: 25px;
  padding-bottom: 25px;
`

const DetailContainer = styled(Col)`
  text-align: right;
  padding-right: 10%;
`

const Title = styled.div`
  color: #707070;
`

const Value = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #190f5d;
`

export default function SummaryItem({ icon, title, value, last }) {
  const { md } = Grid.useBreakpoint()
  return (
    <SummaryItemContainer last={last} horizontal={md}>
      <Col span={8}>
        <img src={icon} />
      </Col>
      <DetailContainer span={16}>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </DetailContainer>
    </SummaryItemContainer>
  )
}

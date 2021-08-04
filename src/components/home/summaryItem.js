import { Col, Row, Grid } from 'antd'
import React from 'react'
import styled from 'styled-components'

const SummaryItemContainer = styled(Row)`
  padding-top: 25px;
  padding-bottom: 25px;
  position: relative;
  :after {
    content: ' ';
    position: absolute;
    display: block;
    background: #e4e9ec;
    ${(props) =>
      props.last
        ? ''
        : `
        ${props.horizontal ? 'bottom: 20%' : 'right: 10%'};
        ${props.horizontal ? 'height: 60%' : 'width: 80%'};
        ${props.horizontal ? 'left' : 'top'}: 100%;
        ${props.horizontal ? 'width' : 'height'}: 1px;
    `}
  }
`

const DetailContainer = styled(Col)`
  text-align: right;
  padding-right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  color: #707070;
`

const Value = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #190f5d;
`

const Icon = styled.div`
  margin-left: 50px;
  width: 90px;
  height: 90px;
  background: #dff4ff;
  border-radius: 999px;
  align-items: center;
  display: flex;
  justify-content: center;
`

export default function SummaryItem({ icon, title, value, last }) {
  const { lg } = Grid.useBreakpoint()
  return (
    <SummaryItemContainer last={last} horizontal={lg}>
      <Col span={8}>
        <Icon>
          <img src={icon} />
        </Icon>
      </Col>
      <DetailContainer span={16}>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </DetailContainer>
    </SummaryItemContainer>
  )
}

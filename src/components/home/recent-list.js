import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { device } from '../../config/device'
import { Col } from 'antd'

export const RecentListContainer = styled.div`
  box-shadow: 0px 3px 5px #00000014;
  border: 1px solid #e7eaf3;
  border-radius: 10px;
  background: #ffffff;
`

export const StyledLink = styled(Link)`
  font-weight: bold;
  color: #c53027;
`
export const RecentListTitleFrame = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #d6d6d6;
`
export const RecentListTitle = styled.span`
  font-size: 15px;
  padding-left: 5px;
`
export const RecentListContentFrame = styled.div`
  overflow: auto;
  height: 600px;
`
export const RecentItem = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 12px;
  color: #999;
  text-align: left;
`
export const RecentItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: #666;
  font-weight: bold;
  font-size: 13px;
`
export const RecentItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const RecentItemData = styled.span`
  color: #c53027;
`
export const RecentRightCol = styled(Col)`
  @media ${device.sm} {
    text-align: left;
  }
  @media ${device.md} {
    text-align: right;
  }
`
export const RecentItemFrag = styled(({ active, ...rest }) => <Col {...rest} sm={24} md={12} />)``
export const RecentList = {
  RecentListTitleFrame,
  RecentListTitle,
  RecentListContentFrame,
  RecentItem,
  RecentItemTitle,
  RecentItemRow,
  RecentItemData,
  RecentRightCol,
  RecentItemFrag,
  RecentListContainer,
}

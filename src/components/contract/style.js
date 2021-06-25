import styled from 'styled-components'
import { Input } from 'antd'
import { Link } from 'react-router-dom'

export const Table = styled.table`
  width: 100%;
  text-align: left;
`

export const TableRow = styled.tr`
  height: 55px;
  border-top: 1px solid #eeeeee;
`

export const Th = styled.th`
  width: 35%;
`

export const BorderRed = styled.div`
  border-top: 5px solid #c23631;
`

export const FontFamily = styled.div`
  padding: 0 2%;
  text-align: left;
`

export const Div = styled.div`
  padding-top: 20px;
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 17px;
`

export const Flex = styled.div`
  display: flex;
`

export const RedSpan = styled.span`
  color: #c53027;
  font-weight: bold;
`

export const QuestionMark = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
export const HoverContent = styled.div`
  width: 130px;
`
export const contentRatio = (
  <HoverContent>
    <p>
      The energy consumed by calling the smart contract is borne by the contract and the user in
      proportion.
    </p>
  </HoverContent>
)
export const contentAsset = (
  <HoverContent>
    <p>Contract creator transfers funds to contract address while deploying contract.</p>
  </HoverContent>
)
export const Wrapper = styled.div`
  padding: 0 2%;
`
export const FuncWrapper = styled.div`
  margin: 2% 2%;
`
export const FuncName = styled.div`
  padding: 1% 2%;
  background-color: #fafafa;
  border-radius: 5px 5px 0px 0px;
  border: 1px solid rgba(223, 215, 202, 0.75);
`
export const FuncBody = styled.div`
  padding: 1% 2%;
  border-radius: 0px 0px 5px 5px;
  border-style: solid;
  border-width: 0px 1px 1px 1px;
  border-color: rgba(223, 215, 202, 0.75);
`
export const Right = styled.div`
  text-align: right;
`
const { TextArea } = Input

export const TextBox = styled(TextArea)`
  color: #333 !important;
`
export const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: #c23631;
  }
`
export const Result = styled.div`
  color: rgb(0, 189, 12);
  padding-left: 20px;
  word-break: break-word;
`
export const Root = styled.span`
  color: rgb(59, 123, 234);
`

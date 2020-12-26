import  styled  from  'styled-components';
import {Badge} from 'antd';
import { Link } from 'react-router-dom';

export const Table = styled.table`
	width : 100%;
	text-align: left;
`;

export const TableRow = styled.tr`
	height: 55px;
	border-top: 1px solid #EEEEEE;
`;

export const Th = styled.th`
    width:140px;
`;

export const Td = styled.td`
    width:550px;
`;

export const BorderRed = styled.div`
	border-top: 5px solid #C23631;
`;

export const FontFamily = styled.div`
	padding: 0 2%;
	font-family: PingFangSC-Regular;
	text-align: left;
`;

export const Div = styled.div`
	padding-top: 20px;
`;

export const Title = styled.div`
	font-weight: bold;
	font-size: 20px;
`;

export const Flex = styled.div`
	display: flex;
`;

export const QuestionMark = styled.div`
	width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #d8d8d8;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const StatusTag = styled.span`
	display: inline-block;
    margin-left: 20px;
    padding: 3px 9px 3px 20px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666;
    text-align: center;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAYCAMAAAA/KXjhAAAAOVBMVEUAAAD////w8PDy8vL09PT09PT19fXz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/MATzvNAAAAEnRSTlMABBEnREhJV2uVu9ni4+Xm7vtwQmBoAAAAAWJLR0QB/wIt3gAAAG5JREFUSMfd1skRgDAMQ1GzhrCj/ovlkIQO9A+ogTeTUWxHtKRLrhzzp4yPfNmbMtxypir9JoDpVhFMFsEsIhhryT7GXLLKuEtWGHvJCpP1JwZ6NKgCVKGp70kNG2p0UosAWmvUkqZOjoh0+pTpBUHVo1RjnwgwAAAAAElFTkSuQmCC) no-repeat;
    background-size: 100% 100%;
`;

export const BadgeGreen = styled(Badge)`
    .ant-badge-count {
        background-color: #E1F3E0;
        color: black
    }  
`;

export const BadgeRed = styled(Badge)`
    .ant-badge-count {
        background-color: #ff0000;
        color: black
    }  
`;
export const HoverContent = styled.div`
    font-family: PingFangSC-Regular;
    width: 130px;
`;
export const contentStatus = (
  <HoverContent>
    <p>Transaction confirmed by 19 or more SRs will be marked "confirmed", or is "unconfirmed".</p>
  </HoverContent>
);
export const StyledLink = styled(Link)`
    &:link, &:visited {
        color: #c23631;
    }
`;

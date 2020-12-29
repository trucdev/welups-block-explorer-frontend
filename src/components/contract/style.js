import  styled  from  'styled-components';
import {Input} from 'antd';

export const Table = styled.table`
	width : 100%;
	text-align: left;
`;

export const TableRow = styled.tr`
	height: 55px;
	border-top: 1px solid #EEEEEE;
`;

export const Th = styled.th`
    width:35%;
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
	font-size: 17px;
`;

export const Flex = styled.div`
	display: flex;
`;

export const RedSpan = styled.span`
    color:#c53027;  
    font-weight:bold;
`;

export const QuestionMark = styled.span`
	  width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #d8d8d8;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
export const HoverContent = styled.div`
    font-family: PingFangSC-Regular;
    width: 130px;
`;
export const contentRatio = (
  <HoverContent>
    <p>The energy consumed by calling the smart contract is borne by the contract and the user in proportion.</p>
  </HoverContent>
);
export const contentAsset = (
  <HoverContent>
    <p>Contract creator transfers funds to contract address while deploying contract.</p>
  </HoverContent>
);
export const Wrapper = styled.div`
  padding: 0 2%;
`;
export const Item = styled.div`
  padding: 0 20px 0 20px;
`;
export const Right = styled.div`
  text-align: right;
`;
const { TextArea } = Input;

export const TextBox = styled(TextArea)`
  color: #333!important;
`;
